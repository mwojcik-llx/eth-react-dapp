import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, List } from "semantic-ui-react";
import { getAccounts, CampaignContractBuilder } from "../../web3";
import PromptModal from "../../components/PromptModal";

class CampaignPreviewPage extends Component {

    constructor(props) {
        super(props);

        const contract = new CampaignContractBuilder()
            .withAddress(props.match.params.campaignId)
            .build();

        this.state = {
            contract: contract,
            campaign: null,
        }
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        this.state.contract.events.CandidateCreated({}, (err, result) => {
            const candidateAddress = result.returnValues[0];
            const candidateName = result.returnValues[1];

            this.setState({
                campaign: {
                    candidates: [
                        ...this.state.campaign.candidates,
                        {
                            id: candidateAddress,
                            name: candidateName
                        }
                    ]
                }
            });
        });
    }

    async componentDidMount() {
        this.subscribeToEvents();
        const account = await getAccounts(this.props.history);
        const campaign = await this.getCampaignInfo();

        this.setState({
            account: account,
            campaign: campaign
        });
    }

    async getCampaignInfo() {
        const result = await this.state.contract.methods.getCampaignInfo().call();
        const name = result[0] || '';
        const voteCount = result[1] || 0;
        const hasCandidates = result[2] || 0;
        const canVote = result[3] || 0;
        let candidatesIds = result[4] || [];

        candidatesIds = candidatesIds.filter(s => s !== '0x0000000000000000000000000000000000000000');

        const candidatesNames = await Promise.all(candidatesIds.map(candidateId => this.state.contract.methods.getCandidateNameById(candidateId).call()));

        const candidates = candidatesIds.map((candidateId, index) => {
            return {
                id: candidateId,
                name: candidatesNames[index]
            }
        });

        return {
            name,
            voteCount,
            hasCandidates,
            canVote,
            candidates
        }
    }

    async createCandidate(candidateName) {
        await this.state.contract.methods.createCandidate(candidateName).send({
            from: this.state.account
        }).then((err, res) => {
            console.log(err,res);
        });
    }

    render() {
        return (
            <Container>

                <div className='create-button-container'>
                    <PromptModal
                        inputLabel='Candidate name'
                        triggerButtonText='Add Candidate'
                        modalTitle='Add Candidate'
                        submitCallback={(candidateName) => this.createCandidate(candidateName)}/>
                </div>
                <Header as='h1' textAlign='center'>{this.state.campaign?.name}</Header>
                <br/>
                <List divided verticalAlign='middle'>
                    <List.Header as='h2'>Candidates</List.Header>
                    {this.state.campaign?.candidates?.map(candidate => (
                        <List.Item key={candidate.id}>
                            <List.Content floated='right'>
                                <Button>Vote</Button>
                            </List.Content>
                            <List.Content>{candidate.name}</List.Content>
                        </List.Item>
                    ))}
                </List>
            </Container>
        );
    }
}

export default withRouter(CampaignPreviewPage);

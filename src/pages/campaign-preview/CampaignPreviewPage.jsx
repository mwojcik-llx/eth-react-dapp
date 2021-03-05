import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, List, Message } from "semantic-ui-react";
import { CampaignContractBuilder } from "../../web3";
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
        const {name, voteCount, canVote, candidates} = await this.getCampaignInfo();

        this.setState({
            campaign: {
                name,
                voteCount,
                candidates
            },
            canUserVote: canVote
        });
    }

    async getCampaignInfo() {
        const result = await this.state.contract.methods.getCampaignInfo().call();
        const name = result[0] || '';
        const voteCount = result[1] || 0;
        const canVote = result[2] || 0;
        const candidatesIds = result[3] || [];

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
            canVote,
            candidates
        }
    }

    async createCandidate(candidateName) {
        await this.state.contract.methods.createCandidate(candidateName).send({
            from: this.props.account
        });
    }

    async voteForCandidate(candidateId) {
        await this.state.contract.methods.voteForCandidate(candidateId)
            .send({from: this.props.account})
            .then(() => {
                this.setState({
                    canUserVote: false,
                    gas: 0
                });
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
                {!!this.state.campaign?.candidates?.length && !this.state.canUserVote ?
                    <Message color='green'>
                        <Message.Header>
                            Thank you for your vote.
                        </Message.Header>
                        <Message.Content>
                            You successfully vote in this campaign.
                        </Message.Content>
                    </Message> : null
                }
                <List divided verticalAlign='middle'>
                    <List.Header as='h2'>Candidates:</List.Header>
                    {this.state.campaign?.candidates?.map(candidate => (
                        <List.Item key={candidate.id}>
                            <List.Content floated='right'>
                                <Button disabled={!this.state.canUserVote}
                                        onClick={() => this.voteForCandidate(candidate.id)}>
                                    Vote
                                </Button>
                            </List.Content>
                            <List.Content>{candidate.name}</List.Content>
                        </List.Item>
                    ))}
                </List>
                {!!this.state.campaign?.candidates?.length ? null :
                    <Message color='yellow'>
                        <Message.Header>Sorry there is no candidates to vote.</Message.Header>
                        <Message.Content>
                            You can <strong>Add Candidate</strong> if you want.
                        </Message.Content>
                    </Message>
                }
            </Container>
        );
    }
}

export default withRouter(CampaignPreviewPage);

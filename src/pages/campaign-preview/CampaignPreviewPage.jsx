import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, List, Message } from "semantic-ui-react";
import { CampaignContractBuilder } from "../../web3";
import PromptModal from "../../components/PromptModal";
import ConfirmModal from "../../components/ConfirmModal";

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
        this.state.contract.events.CandidateCreated({}, (_, result) => {
            const candidateAddress = result.returnValues[0];
            const candidateName = result.returnValues[1];

            this.setState({
                candidates: [
                    ...this.state.candidates,
                    {
                        id: candidateAddress,
                        name: candidateName
                    }
                ]
            });
        });

        this.state.contract.events.UserVoted({}, () => {
            this.setState({
                canUserVote: false,
            })
        });

        this.state.contract.events.VotingEnded({}, () => {
            this.setState({
                campaign: {
                    ...this.state.campaign,
                    isActive: false,
                }
            })
        });
    }

    async componentDidMount() {
        const {name, voteCount, canVote, candidates, isActive, userIsOwner} = await this.getCampaignInfo();

        this.setState({
            campaign: {
                name,
                voteCount,
                isActive,
                userIsOwner
            },
            candidates,
            canUserVote: canVote
        });
    }

    async getCampaignInfo() {
        const result = await this.state.contract.methods.getCampaignInfo().call();
        const name = result[0] || '';
        const voteCount = result[1] || 0;
        const canVote = result[2] || 0;
        const candidatesIds = result[3] || [];
        const isActive = result[4] || false;
        const userIsOwner = result[5] || false;

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
            candidates,
            isActive,
            userIsOwner
        }
    }

    async createCandidate(candidateName) {
        await this.state.contract.methods.createCandidate(candidateName).send({
            from: this.props.account
        });
    }

    async voteForCandidate(candidateId) {
        await this.state.contract.methods.voteForCandidate(candidateId)
            .send({
                from: this.props.account,
                value: 1
            });
    }

    async endVoting() {
        await this.state.contract.methods.endTheVoting().send({from: this.props.account});
    }

    render() {
        return (
            <Container>
                {
                    !!this.state.campaign?.isActive &&
                    <div className='create-button-container'>
                        <PromptModal inputLabel='Candidate name'
                                     triggerButtonText='Add Candidate'
                                     modalTitle='Add Candidate'
                                     submitCallback={(candidateName) => this.createCandidate(candidateName)}
                        />
                        {!!this.state.campaign?.userIsOwner &&
                        <ConfirmModal buttonText='End voting'
                                      buttonColor='red'
                                      headerText='End voting'
                                      messageText='After voting ends, nobody can vote in this campaign. Are you sure?'
                                      confirmCallback={() => this.endVoting()}
                        />
                        }
                    </div>
                }
                <Header as='h1' textAlign='center'>{this.state.campaign?.name}</Header>
                <br/>
                {!!this.state?.candidates?.length && !this.state.canUserVote &&
                <Message color='green'>
                    <Message.Header>
                        Thank you for your vote.
                    </Message.Header>
                    <Message.Content>
                        You successfully vote in this campaign.
                    </Message.Content>
                </Message>
                }
                <List divided verticalAlign='middle'>
                    <List.Header as='h2'>Candidates:</List.Header>
                    {this.state?.candidates?.map(candidate => (
                        <List.Item key={candidate.id}>
                            <List.Content floated='right'>
                                <Button disabled={!this.state.canUserVote || !this.state.campaign.isActive}
                                        onClick={() => this.voteForCandidate(candidate.id)}>
                                    Vote
                                </Button>
                            </List.Content>
                            <List.Content>{candidate.name}</List.Content>
                        </List.Item>
                    ))}
                </List>
                {!this.state?.candidates?.length &&
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

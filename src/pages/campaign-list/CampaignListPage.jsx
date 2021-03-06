import React, { Component } from 'react';
import { Button, Card, Container, Grid, Header, Image, Label, Message } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { CampaignFactoryContractBuilder } from '../../web3';

import './CampaignListPage.css';
import campaignLogo from '../../assets/campaign-logo.png';
import PromptModal from "../../components/PromptModal";

class CampaignListPage extends Component {


    constructor(props) {
        super(props);

        const contract = new CampaignFactoryContractBuilder().build();

        this.state = {
            campaigns: [],
            contract: contract,
        }
        this.subscribeToEvents();

    }

    subscribeToEvents() {
        this.state.contract.events.CampaignCreated({}, (err, result) => {
            const newCampaignAddress = result.returnValues[0];
            const newCampaignName = result.returnValues[1];

            this.setState({
                campaigns: [
                    ...this.state.campaigns,
                    {
                        id: newCampaignAddress,
                        name: newCampaignName,
                        voteCount: 0,
                        hasCandidates: false,
                        canVote: false,
                        isActive: true,
                        isUserOwner: true,
                    }
                ]
            });
        });
    }

    async componentDidMount() {
        this.setState({
            campaigns: await this._createCampaignsArray(),
        });
    }

    async _createCampaignsArray() {
        const result = await this.state.contract.methods.getCampaigns().call();

        const addressesArray = result[0];
        const namesArray = await Promise.all(addressesArray.map(address =>
            this.state.contract.methods.getCampaignName(address).call()));
        const voteCountsArray = result[1];
        const hasCandidatesArray = result[2];
        const canVoteArray = result[3];
        const isActiveArray = result[4];
        const isUserOwnerArray = result[5];

        return addressesArray.map((address, index) => ({
            id: address,
            name: namesArray[index],
            voteCount: voteCountsArray[index],
            hasCandidates: hasCandidatesArray[index],
            canVote: canVoteArray[index],
            isActive: isActiveArray[index],
            isUserOwner: isUserOwnerArray[index],
        }));


    }

    async createNewCampaign(campaignName) {
        await this.state.contract.methods.createCampaign(campaignName)
            .send({from: this.props.account})
            .catch(err => {
                console.error(err);
                //TODO: show error ?
            });
    }

    render() {
        return (
            <Container>
                <div className='create-button-container'>
                    <PromptModal
                        inputLabel='Campaign name'
                        triggerButtonText='Create campaign'
                        modalTitle='Create Campaign'
                        submitCallback={(campaignName) => this.createNewCampaign(campaignName)}/>
                </div>
                <Header textAlign='center' size='huge'>Campaigns</Header>
                <Grid divided padded>
                    {this.state.campaigns.map(campaign => (
                        <Card key={campaign.id}>
                            <Image src={campaignLogo} wrapped ui={false}/>
                            <Card.Content>
                                {!campaign.isUserOwner ? null :
                                    <Message color='green'>You are owner of this campaign.</Message>
                                }
                                <Card.Header className='campaign-name-header'>{campaign.name}</Card.Header>
                                <Card.Meta>
                                    <div>Vote count: {campaign.voteCount}</div>
                                    <div>Has candidates: {campaign.hasCandidates ? 'True' : 'False'}</div>
                                    <div>Status: {campaign.isActive ?
                                        <Label color='green'>Active</Label> :
                                        <Label color='orange'>Ended</Label>}
                                    </div>
                                    <br/>
                                </Card.Meta>
                                <Card.Content extra>
                                    <Button primary as={Link} to={`/campaign/${campaign.id}`}>
                                        Preview
                                    </Button>
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid>
            </Container>
        );
    }
}

export default withRouter(CampaignListPage);

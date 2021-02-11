import { Component } from 'react';
import { Button, Card, Grid, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Utils } from '../../Utils';
import { createContract } from "../../web3/votingContract";
import { web3 } from '../../web3/web3';

import './HomePage.css';
import campaignLogo from '../../assets/campaign-logo.png';
import CampaignCreatePage from "../campaign-create/CampaignCreatePage";

class HomePage extends Component {
    state = {
        campaigns: [],
        contract: null,
        account: '',
        isLoggedIn: false,
    }

    async componentDidMount() {
        const account = await this._getAccounts();

        this.setState({
            account: account,
            isLoggedIn: !!account,
            contract: createContract()
        });

        this.setState({
            campaigns: await this._createCampaignsArray(),
        });
    }

    async _getAccounts() {
        const accounts = await web3.eth.getAccounts();
        return accounts.length ? accounts[0] : '';
    }

    async _createCampaignsArray() {
        const campaignCounter = +await this.state.contract.methods.getCampaignCount().call();
        const campaignPromises = Utils.createEmptyArray(campaignCounter)
            .map(async (_, index) => this._createCampaignObject(index));

        return Promise.all(campaignPromises);
    }

    async _createCampaignObject(campaignIndex) {
        const campaignName = await this.state.contract.methods.getCampaignNameByIndex(campaignIndex).call();
        const candidatesCount = await this.state.contract.methods.getCandidatesCountByCampaignId(campaignIndex).call();
        return {
            id: campaignIndex,
            name: campaignName,
            candidateCounter: +candidatesCount,
            candidates: Utils.createEmptyArray(candidatesCount)
        };
    }

    render() {
        return (
            <div>
                <div className='title-bar'>
                    <CampaignCreatePage/>
                </div>
                <Header textAlign='center' size='huge'>Campaigns</Header>
                <Grid divided padded>
                    {this.state.campaigns.map(campaign => (
                        <Card key={campaign.id}>
                            <Image src={campaignLogo} wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>{campaign.name}</Card.Header>
                                <Card.Content extra>
                                    <Button primary as={Link} to={`/campaign/${campaign.id}`}>
                                        Preview
                                    </Button>
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default HomePage;

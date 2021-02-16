import { Component } from 'react';
import { Button, Card, Grid, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { CampaignFactoryContractBuilder } from '../../web3/contractBuilders';
import { web3 } from '../../web3/web3';

import './HomePage.css';
import campaignLogo from '../../assets/campaign-logo.png';
import CampaignCreatePage from "../campaign-create/CampaignCreatePage";

class HomePage extends Component {


    constructor(props) {
        super(props);

        const contract = new CampaignFactoryContractBuilder().build();

        this.state = {
            campaigns: [],
            contract: contract,
            account: '',
            isLoggedIn: false,
        }
        this.subscribeToEvents();

    }

    subscribeToEvents(){
        this.state.contract.events.CampaignCreated({},(err, result) => {

            console.log(result);
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
                    }
                ]
            });
        });
    }

    async componentDidMount() {
        const account = await this._getAccounts();

        this.setState({
            account: account,
            isLoggedIn: !!account,
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
        const result = await this.state.contract.methods.getCampaigns().call();

        const addressesArray = result[0];
        const namesArray = await Promise.all(addressesArray.map(address =>
            this.state.contract.methods.getCampaignName(address).call()));
        const voteCountsArray = result[1];
        const hasCandidatesArray = result[2];
        const canVoteArray = result[3];

        return addressesArray.map((add, index) => ({
            id: add,
            name: namesArray[index],
            voteCount: voteCountsArray[index],
            hasCandidates: hasCandidatesArray[index],
            canVote: canVoteArray[index],
        }));


    }

    async createNewCampaign(campaignName) {
        await this.state.contract.methods.createCampaign(campaignName)
            .send({from: this.state.account})
            .catch(err => {
                console.error(err);
                //TODO: show error ?
            });
    }

    render() {
        return (
            <div>
                <div className='title-bar'>
                    <CampaignCreatePage createCampaign={(campaignName) => this.createNewCampaign(campaignName)}/>
                </div>
                <Header textAlign='center' size='huge'>Campaigns</Header>
                <Grid divided padded>
                    {this.state.campaigns.map(campaign => (
                        <Card key={campaign.id}>
                            <Image src={campaignLogo} wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>{campaign.name}</Card.Header>
                                <Card.Meta>
                                    <div>Vote count: {campaign.voteCount}</div>
                                    <div>Has candidates: {campaign.hasCandidates ? 'True' : 'False'}</div>
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
            </div>
        );
    }
}

export default HomePage;

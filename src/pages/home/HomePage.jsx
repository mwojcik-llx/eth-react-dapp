import { Component } from 'react';
import { Button, Card, Grid, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import './HomePage.css';
import campaignLogo from '../../assets/campaign-logo.png';

class HomePage extends Component {
    state = {
        campaigns: []
    }

    componentDidMount() {
        this.setState({
            campaigns: this._mockCampaignNamesArray()
        })
    }

    _mockCampaignNamesArray() {
        return [
            'Super Campaign 1',
            'Super Campaign 2',
            'Super Campaign 3',
            'Super Campaign 4'
        ].map((campaignName, index) => ({
            id: index,
            name: campaignName
        }));
    }

    render() {
        return (
            <div>
                <div className='title-bar'>
                    <Button primary as={Link} to='/campaign/new'>Create Campaign</Button>
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

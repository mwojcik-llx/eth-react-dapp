import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CampaignContractBuilder } from "../../web3/contractBuilders";
import { Container, Header } from "semantic-ui-react";

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
    }

    async componentDidMount() {
        const result = await this.state.contract.methods.getCampaignInfo().call();
        const name = result[0] || '';
        const voteCount = result[1] || 0;
        const hasCandidates = result[2] || 0;
        const canVote = result[3] || 0;

        this.setState({
            campaign: {name, voteCount, hasCandidates, canVote}
        })
        console.log('result', result);
    }

    render() {
        return (
            <Container style={{marginTop: '3em'}}>
                <Header as='h1'>{this.state.campaign?.name}</Header>
            </Container>
        );
    }
}

export default withRouter(CampaignPreviewPage);

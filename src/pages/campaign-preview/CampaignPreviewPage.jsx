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
        const campaign = await this.getCampaignInfo();

        this.setState({campaign});
    }

    async getCampaignInfo() {
        const result = await this.state.contract.methods.getCampaignInfo().call();
        const name = result[0] || '';
        const voteCount = result[1] || 0;
        const hasCandidates = result[2] || 0;
        const canVote = result[3] || 0;
        const candidatesIds = result[4] || [];

        const candidatesNames = await Promise.all(candidatesIds.map(candidateId => this.state.contract.methods.getCandidateNameById(candidateId).call()));

        const candidates = candidatesIds.forEach((candidateId, index) => {
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

    async createCandidate() {
        await this.state.contract.methods.createCandidate('x1').send({
            from: '0xb925B1e447dd6C41E8eD2784c4bfb27c44B5fA2A'
        })
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

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

        const candidatesIds = await this.state.contract.methods.getCandidatesIds().call();

        const candidateNames = await Promise.all(candidatesIds.map(candidateId => {
            return this.state.contract.methods.getCandidateNameById(candidateId).call();
        }));

        const candidates = candidatesIds.map((candidateId, index) => ({
            id: candidateId,
            name: candidateNames[index]
        }));

        this.setState({
            campaign: {name, voteCount, hasCandidates, canVote, candidates}
        })
        console.log('result', result);
    }

    async createCandidate() {
        await this.state.contract.methods.createCandidate('x1').send({
            from: '0x7E1dDdB9EA1C93d3A15eE69a61A5581cc4726ACC'
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

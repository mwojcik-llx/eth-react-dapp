import { web3 } from "./web3";
import campaignFactoryAbi from './CampaignFactory.json';
import campaignAbi from './Campaign.json';

const campaignFactoryAddress = '0xb47e7B3eec6735360dbE59ED5Af06e3aDC62B9dC';

function createContract(abi, contractAddress) {
    return new web3.eth.Contract(abi, contractAddress);
}

export class CampaignFactoryContractBuilder {
    address = campaignFactoryAddress;
    abi = campaignFactoryAbi;

    build() {
        return createContract(this.abi, this.address);
    }
}

export class CampaignContractBuilder {
    address = '';
    abi = campaignAbi;

    withAddress(contractAddress){
        this.address = contractAddress;
        return this;
    }

    build() {
        return createContract(this.abi, this.address);
    }
}

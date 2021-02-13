import { web3 } from "./web3";

function createContract(abi, contractAddress) {
    return new web3.eth.Contract(abi, contractAddress);
}

export class CampaignFactoryContractBuilder {
    address = '';
    abi = [];

    build() {
        return createContract(this.abi, this.address);
    }
}

export class CampaignContractBuilder {
    address = '';
    abi = [];

    build() {
        return createContract(this.abi, this.address);
    }
}

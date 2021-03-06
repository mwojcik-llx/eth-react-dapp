import { web3 } from "./web3";
import campaignFactoryAbi from './CampaignFactory.json';
import campaignAbi from './Campaign.json';

const campaignFactoryAddress = '0xf9BEa492ceCedb587fDc6be23C1537a1c11d6424';

function createContract(abi, contractAddress) {
    return new web3.eth.Contract(abi, contractAddress, {
        gasPrice: '0',
    });
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

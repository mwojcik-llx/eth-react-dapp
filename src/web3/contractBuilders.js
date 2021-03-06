import { web3 } from "./web3";
import campaignFactoryAbi from './CampaignFactory.json';
import campaignAbi from './Campaign.json';

class BaseContractBuilder {
    _address = '';
    _abiDefinition = [];
    _options = {};

    constructor(abiDefinition, options) {
        this._abiDefinition = abiDefinition;
        this._options = options || {gasPrice: '0'};
    }

    withAddress(contractAddress) {
        this._address = contractAddress;
        return this;
    }

    build() {
        if (!this._abiDefinition) {
            throw new Error('Please provide abi definition to builder.');
        }

        if (!this._address) {
            throw new Error('Please provide contract address to builder.');
        }

        return new web3.eth.Contract(this._abiDefinition, this._address, this._options);
    }

}

export class CampaignFactoryContractBuilder extends BaseContractBuilder {
    constructor() {
        super(campaignFactoryAbi);
    }
}

export class CampaignContractBuilder extends BaseContractBuilder {
    constructor() {
        super(campaignAbi);
    }
}

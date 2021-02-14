import { web3 } from "./web3";

function createContract(abi, contractAddress) {
    return new web3.eth.Contract(abi, contractAddress);
}

export class CampaignFactoryContractBuilder {
    address = '0x20eDE474bf7Ac55e57B2f976D115717cf7960a94';
    abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "campaignName",
                    "type": "string"
                }
            ],
            "name": "createCampaign",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCampaigns",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bool[]",
                    "name": "",
                    "type": "bool[]"
                },
                {
                    "internalType": "bool[]",
                    "name": "",
                    "type": "bool[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "campaignAddress",
                    "type": "address"
                }
            ],
            "name": "getCampaignName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    build() {
        return createContract(this.abi, this.address);
    }
}

export class CampaignContractBuilder {
    address = '';
    abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidateName",
                    "type": "string"
                }
            ],
            "name": "createCandidate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "candidateAddress",
                    "type": "address"
                }
            ],
            "name": "voteForCandidate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getVoteCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "hasAtLeastOneCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "canUserVote",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    withAddress(contractAddress){
        this.address = contractAddress;
    }

    build() {
        return createContract(this.abi, this.address);
    }
}

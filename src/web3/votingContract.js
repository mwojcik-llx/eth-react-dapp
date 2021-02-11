import { web3 } from './web3';
import votingAbi from './votingAbi';

const contractAddress = '0xb192D5bC67C432C5A8c3eab568d3BBab78119588';

export function createContract() {
    return new web3.eth.Contract(votingAbi, contractAddress);
}



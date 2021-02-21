import Web3 from 'web3';

export const web3 = new Web3(window.web3.currentProvider);

export async function getAccounts(history) {
    const accounts = await web3.eth.getAccounts();
    if (!accounts.length || accounts.length !== 1) {
        history.push('/login');
    }
    return accounts[0];
}

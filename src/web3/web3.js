import Web3 from 'web3';

export const web3 = new Web3(window.web3.currentProvider);

export const tryLogin = async () => await window.ethereum.request({method: 'eth_requestAccounts'});

export function registerLoggedInAccountsWatcher(history, callback, loginOnPageLoad) {
    if (!window.ethereum) {
        alert('To use dApps you need to install some wallet browser plugin. Check out i.e. MetaMask.');
        return false;
    }

    if (loginOnPageLoad) {
        tryLogin().then(accounts => {
            onAccountChange(accounts, history, callback);

            window.ethereum.on('accountsChanged', (accounts) => onAccountChange(accounts, history, callback));
        });
    } else {
        window.ethereum.on('accountsChanged', (accounts) => onAccountChange(accounts, history, callback));
    }
}

const onAccountChange = (accounts, history, callback) => {
    console.log('Logged in to accounts:', accounts);
    if (accounts.length !== 1) {
        const message = accounts.length === 0 ?
            'You must be logged in to use dApp.' :
            'You must be logged in to only one account at one time.';
        alert(message);
        callback(null);

        history.push('/login');
    } else {
        callback(accounts[0]);
        history.push('/');
    }
}

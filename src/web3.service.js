import Web3 from 'web3';

export class Web3Service {

    // PUBLIC API

    constructor(){
        this._loginFunctionCalled = false;
    }

    /**
     * WARNING THIS FUNCTION CAN BE CALLED ONLY ONCE!
     */
    async loginToBlockchain(onAccountChangedCallback = null) {
        if(this._loginFunctionCalled) {
            return false;
        }
        if (!window.ethereum) {
            alert('To use dApps you need to install some wallet browser plugin. Check out i.e. MetaMask.');
            return false;
        }

        if(onAccountChangedCallback !== null &&  typeof onAccountChangedCallback === 'function'){
            this.registerOnAccountChangeAction(onAccountChangedCallback);
        }

        this.web3 = new Web3(window.ethereum);

        let accounts = await this.web3.eth.getAccounts();
        if (accounts.length > 0) {
            this._onAccountChanged(accounts);
        }

        window.ethereum.on('accountsChanged', (accounts) => this._onAccountChanged(accounts));

        try {
            accounts = await this.web3.eth.requestAccounts();
        } catch (err) {
            alert('Account login rejected by user.');
        }
        this._loginFunctionCalled = true;
        return true;
    }

    registerOnAccountChangeAction(accountChangeCallback){
        this._onAccountChangedFn = accountChangeCallback;
    }

    // Private functions

    _onAccountChangedFn = (account) => {
        console.log(account);
    }

    _onAccountChanged(accounts) {
        let account = '';

        if (accounts?.length === 1) {
            account = accounts[0];
        } else if (accounts?.length > 1) {
            alert('Too many accounts selected!');
        } else {
            alert('Please login to blockchain account.');
        }

        this._onAccountChangedFn(account);
    }
}

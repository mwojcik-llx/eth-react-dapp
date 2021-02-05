// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Web3 from 'web3';
import TestContract from './TestContract.json';

class App extends React.Component {

  async componentDidMount() {
    await this.loadBlockchainData();
    console.log(TestContract.abi)
    const abi = [{ "constant": true, "inputs": [], "name": "getTestValue", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes32", "name": "newValue", "type": "bytes32" }], "name": "setTestValue", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
    this.contract = new this.web3.eth.Contract(abi);
    console.log(this.contract);
    this.contract.methods.setTestValue('0x25fB0cDF3B38C9a5e9F63D6bFBE6219AD4992163').send({
      from: this.state.account
    });
    const result = await this.contract.methods.getTestValue().call();
    console.log(result);
  }

  onAccountChanged(accounts) {
    let account = '';

    if (accounts?.length === 1) {
      account = accounts[0];
    } else if (accounts?.length > 1) {
      alert('Too many accounts selected!');
    } else {
      alert('Please login to blockchain account.');
    }

    this.setState({ account });
  }

  async loadBlockchainData() {
    if (!window.ethereum) {
      alert('To use dApps you need to install some wallet browser plugin. Check out i.e. MetaMask.');
      return false;
    }

    this.web3 = new Web3(window.ethereum);

    let accounts = await this.web3.eth.getAccounts();
    if (accounts.length > 0) {
      this.onAccountChanged(accounts);
    }

    window.ethereum.on('accountsChanged', (accounts) => this.onAccountChanged(accounts));

    try {
      accounts = await this.web3.eth.requestAccounts();
    } catch (err) {
      alert('Account login rejected by user.');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: ''
    };
  }

  render() {
    return (
      <div>Actual account is: {this.state.account}</div>
    )
  }
}

export default App;
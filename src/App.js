// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Web3 from 'web3';

class App extends React.Component {
  componentDidMount() {
    this.loadBlockchainData();
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

    const web3 = new Web3(window.ethereum);

    let accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      this.onAccountChanged(accounts);
    }

    window.ethereum.on('accountsChanged', (accounts) => this.onAccountChanged(accounts));

    try {
      accounts = await web3.eth.requestAccounts();
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
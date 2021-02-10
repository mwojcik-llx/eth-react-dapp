// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Web3 from 'web3';
import TestContract from './contracts/TestContract.json';
import { Web3Service } from './web3.service';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: ''
    };

    this.web3Service = new Web3Service();
    this.testContract = null;
  }

  async componentDidMount() {
    await this.web3Service.loginToBlockchain((account) => {
      this.setState({
        account: account
      })
    });
    this.testContract = await this.web3Service.createTruffleContractInstance(TestContract);
  }

  render() {
    return (
      <div>Actual account is: {this.state.account}</div>
    )
  }
}

export default App;
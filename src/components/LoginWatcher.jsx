import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { registerLoggedInAccountsWatcher } from "../web3";

class LoginWatcher extends Component {

    componentDidMount() {
        registerLoggedInAccountsWatcher(this.props.history, this.props.onAccountChanged, true);
    }

    render() {
        return (<React.Fragment/>);
    }
}

export default withRouter(LoginWatcher);

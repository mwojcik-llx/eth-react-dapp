import { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Grid, Header, Image } from "semantic-ui-react";

import logoImg from '../../assets/login-icon.png';
import { tryLogin } from "../../web3";

class LoginPage extends Component {

    async onLoginClick() {
        await tryLogin()
    }

    render() {
        return (
            <Grid centered textAlign='center' verticalAlign='middle' style={{height: '100vh'}} columns={2}>
                <Grid.Column>
                    <Image centered src={logoImg}/>
                    <Header as='h1' textAlign='center'>
                        Login to dApp
                    </Header>
                    <Button fluid primary size='large' onClick={() => this.onLoginClick()}>Login</Button>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(LoginPage);

import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";

import logoImg from '../../assets/login-icon.png';

class LoginPage extends Component {

    render() {
        return (
            <Grid centered textAlign='center' verticalAlign='middle' style={{height: '100vh'}} columns={2}>
                <Grid.Column >
                    <Image centered src={logoImg}/>
                    <Header as='h1' textAlign='center'>
                        Login to dApp
                    </Header>
                    <Segment>
                        <Button fluid size='large'>Login</Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(LoginPage);

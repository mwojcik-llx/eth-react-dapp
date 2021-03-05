import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import CampaignListPage from "./pages/campaign-list/CampaignListPage";
import CampaignPreviewPage from "./pages/campaign-preview/CampaignPreviewPage";
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import LoginWatcher from "./components/LoginWatcher";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: ''
        }
    }

    setAccount(account) {
        this.setState({
            account: account
        });
    }

    authorizedRoutes() {
        return (
            <Switch>
                <Route exact path='/'>
                    <CampaignListPage account={this.state.account}/>
                </Route>

                <Route path='/campaign/:campaignId'>
                    <CampaignPreviewPage account={this.state.account}/>
                </Route>
                <Route path='/login'>
                    <Redirect to='/'/>
                </Route>
                <Route>
                    <NotFoundPage/>
                </Route>
            </Switch>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Menu inverted>
                        <Menu.Item as={Link} to='/'>Home</Menu.Item>
                    </Menu>
                    <LoginWatcher onAccountChanged={(account) => this.setAccount(account)}/>
                    {this.state.account ?
                        this.authorizedRoutes() :
                        <Switch>
                            <Route path='/login'>
                                <LoginPage/>
                            </Route>
                            <Route>
                                <Redirect to='/login'/>
                            </Route>
                        </Switch>

                    }
                </Router>
            </React.Fragment>
        )
    }
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useHistory, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import CampaignListPage from "./pages/campaign-list/CampaignListPage";
import CampaignPreviewPage from "./pages/campaign-preview/CampaignPreviewPage";
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { registerLoggedInAccountsWatcher } from "./web3";

function App() {

    const history = useHistory();
    const [account, setAccount] = useState('');

    registerLoggedInAccountsWatcher(history, (account) => {
        setAccount(account)
    });


        return (
            <React.Fragment>
                <Router>


                    <Switch>
                        <Route exact path='/'>
                            <CampaignListPage account={account}/>
                        </Route>
                        <Route path='/campaign/:campaignId'>
                            <CampaignPreviewPage account={account}/>
                        </Route>
                        <Route path='/login'>
                            <LoginPage/>
                        </Route>
                        <Route>
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </Router>
            </React.Fragment>
        );
}

export default App;

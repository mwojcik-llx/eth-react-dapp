import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import CampaignListPage from "./pages/campaign-list/CampaignListPage";
import CampaignPreviewPage from "./pages/campaign-preview/CampaignPreviewPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import LoginPage from "./pages/login/LoginPage";

ReactDOM.render(
    <React.Fragment>
        <Router>
            <Menu inverted>
                <Menu.Item as={Link} to='/'>Home</Menu.Item>
                <Menu.Item as={Link} to='/404'>Not Found</Menu.Item>
            </Menu>

            <Switch>
                <Route exact path='/'>
                    <CampaignListPage/>
                </Route>
                <Route path='/campaign/:campaignId'>
                    <CampaignPreviewPage/>
                </Route>
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Route>
                    <NotFoundPage/>
                </Route>
            </Switch>
        </Router>
    </React.Fragment>,
    document.getElementById('root')
);

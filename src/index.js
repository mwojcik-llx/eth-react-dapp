import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'

import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import HomePage from "./pages/home/HomePage";
import CreateCampaignPage from "./pages/campaign-create/CampaignCreatePage";
import CampaignPreviewPage from "./pages/campaign-preview/CampaignPreviewPage";
import VotingPage from "./pages/voting/VotingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Menu inverted>
                <Menu.Item as={Link} to='/'>Home</Menu.Item>
                <Menu.Item as={Link} to='/404'>Not Found</Menu.Item>
            </Menu>

            <Switch>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
                <Route path='/campaign/new'>
                    <CreateCampaignPage/>
                </Route>
                <Route path='/campaign/:campaignId'>
                    <CampaignPreviewPage/>
                </Route>
                <Route path='/vote/:campaignId'>
                    <VotingPage/>
                </Route>
                <Route>
                    <NotFoundPage/>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

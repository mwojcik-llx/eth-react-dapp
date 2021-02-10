import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import CreateCampaignPage from './pages/CrateCampaignPage';
import VotePage from './pages/VotePage';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <Menu inverted>
                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                    <Menu.Item as={Link} to='/campaign/new'>Create Campaign</Menu.Item>
                </Menu>

                <Switch>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route path='/campaign/new'>
                        <CreateCampaignPage/>
                    </Route>
                    <Route path='campaign/:campaignId'>
                        <CampaignPage/>
                    </Route>
                    <Route path='/vote/:campaignId'>
                        <VotePage/>
                    </Route>
                    <Route>
                        <NotFoundPage/>
                    </Route>
                </Switch>

            </Router>
        )
    }
}

export default App;

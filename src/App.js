// import logo from './logo.svg';
// import './App.css';
import { Container, Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
// import VotingContract from './contracts/Voting.json';

import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import CreateCampaignPage from './pages/CrateCampaignPage';
import VotePage from './pages/VotePage';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(HomePage);
  }

  render() {
    return (
      <Router>
        <Container>
          <Menu secondary>
            <Menu.Item name="home">
              <Link to="/" />
            </Menu.Item>
          </Menu>

          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='campaign/:campaignId' component={CampaignPage} />
            <Route path='campaign/new' component={CreateCampaignPage} />
            <Route path='vote/:campaignId' component={VotePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Router>
    )
  }
}

export default App;
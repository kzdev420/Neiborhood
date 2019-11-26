import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import PrivateRoute from './private_route';
import LandingPage from'./login/landing_layout';
import SignUpPage from'./sign_up/sign_up_layout';
import RequestsPage from './map/requests_layout';
import ConversationsPage from './inbox/conversations';
import MyRequestsPage from './my_requests/my_requests_page';
import NotFound from './not_found';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login" exact component={LandingPage} />
            <Route path="/signup" component={SignUpPage} />
            <PrivateRoute exact path="/" component={RequestsPage} />
            <PrivateRoute path='/inbox' component={ConversationsPage} />
            <PrivateRoute path="/myrequests" component={MyRequestsPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

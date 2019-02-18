import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import MyNavbar from '../components/myNavbar/myNavbar';
import connection from '../helpers/data/connection';
import Auth from '../components/pages/auth/auth';
import Profile from '../components/pages/profile/profile';
import Habits from '../components/pages/habits/habits';
import Records from '../components/pages/records/records';
import authRequests from '../helpers/data/authRequests';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    $(function(){  
      var posY1 = 0;
      var posY2 = 0;
      var posY3 = 0;
      setInterval(function(){
        if (posY1 <= -900) posY1 = 0;
        if (posY2 <= -900) posY2 = 0;
        if (posY3 <= -1200) posY3 = 0;
        posY1 -= 1;
        posY2 -= 2;
        posY3 -= 3;
        $('.crystal_01').css({ backgroundPosition: '0' + posY1 + 'px' });
        $('.crystal_02').css({ backgroundPosition: '0' + posY2 + 'px' });
        $('.crystal_03').css({ backgroundPosition: '0' + posY3 + 'px' });
      }, 50);
      $(window).scroll(function () {});
    });

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (this.state.pendingUser) {
      return (null);
    }
    return (
      <div className="App">
        <div id="crystals">
          <div className="crystal_01"></div>
          <div className="crystal_02"></div>
          <div className="crystal_03"></div>
        </div>
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
            <div className="container">
              <div className="mt-5">
                <Switch>
                  <PrivateRoute path='/' exact component={Profile} authed={this.state.authed} />
                  <PrivateRoute path='/home' component={Profile} authed={this.state.authed} />
                  <PrivateRoute path='/habits' component={Habits} authed={this.state.authed} />
                  <PrivateRoute path='/records' component={Records} authed={this.state.authed} />
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

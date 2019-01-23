import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../components/myNavbar/myNavbar';
import connection from '../helpers/data/connection';
import Auth from '../components/auth/auth';
import Profile from '../components/profile/profile';
import Habits from '../components/habits/habits';
import Records from '../components/records/records';
import authRequests from '../helpers/data/authRequests';
import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} />
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }

    return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
        <Profile />
        <Habits />
        <Records />
      </div>
    );
  }
}

export default App;

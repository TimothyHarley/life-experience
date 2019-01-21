import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../components/myNavbar/myNavbar';
import connection from '../helpers/data/connection';
import Auth from '../components/auth/auth';
import './App.scss';

class App extends Component {
  componentDidMount() {
    connection();
  }

  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Auth />
      </div>
    );
  }
}

export default App;

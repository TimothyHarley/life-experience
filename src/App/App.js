import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../components/myNavbar/myNavbar';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNavbar />
      </div>
    );
  }
}

export default App;

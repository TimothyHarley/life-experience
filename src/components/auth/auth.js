import React from 'react';
import './auth.scss';
import authRequests from '../../helpers/data/authRequests';
import googleButton from './login-google.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error('There was an error with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn loginButton" onClick={this.authenticateUser}>
          <img src={googleButton} alt='google login button' />
        </button>
      </div>
    );
  }
}

export default Auth;

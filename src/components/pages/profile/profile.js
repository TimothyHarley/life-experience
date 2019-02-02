import React from 'react';
import './profile.scss';

import authRequests from '../../../helpers/data/authRequests';

class Profile extends React.Component {

  render() {
    return (
      <div className="profile">
        <h2>{authRequests.userProfile().displayName}</h2>
        <img src={authRequests.userProfile().photoURL} alt="profile"/>
      </div>
    );
  }
}

export default Profile;

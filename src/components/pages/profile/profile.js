import React from 'react';
import { Row, Col, Progress } from 'reactstrap';
import './profile.scss';

import authRequests from '../../../helpers/data/authRequests';

class Profile extends React.Component {
  render() {
    return (
      <Row className="myProfile">
        <Col>
          <img src={authRequests.userProfile().photoURL} alt="your profile"/>
          <h2>{authRequests.userProfile().displayName}</h2>
        </Col>
        <Col>
          <div className="xpBar">
            <div className="text-center">Fitness</div>
            <Progress value="1" max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Academic</div>
            <Progress value="1" max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Social</div>
            <Progress value="1" max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Home</div>
            <Progress value="1" max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Creativity</div>
            <Progress value="1" max="5" />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Profile;

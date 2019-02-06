import React from 'react';
import { Row, Col, Progress } from 'reactstrap';
import './profile.scss';

import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';

const defaultUser = {
  uid: '',
  username: '',
  userLevel: 1,
  fitnessXp: 0,
  academicXp: 0,
  socialXp: 0,
  homeXp: 0,
  creativityXp: 0,
};

class Profile extends React.Component {
  state = {
    user: {},
    newUser: defaultUser,
  };

  newUser = () => {
    const uid = authRequests.currentUser();
    userRequests.getCurrentUser(uid)
      .then((user) => {
        if (user === undefined) {
          const userId = authRequests.userProfile();
          const newUser = { ...this.state.newUser };
          newUser.uid = userId.uid;
          newUser.username = userId.displayName;
          userRequests.createNewUser(newUser)
            .then(() => {
              this.setState({ user: newUser });
            });
        } else {
          this.setState({ user });
        }
      });
  }

  componentDidMount() {
    this.newUser();
  }

  render() {
    const { user } = this.state;

    return (
      <Row className="myProfile">
        <Col>
          <img src={authRequests.userProfile().photoURL} alt="your profile"/>
          <h2>{user.username}</h2>
          <h2>Level {user.userLevel}</h2>
        </Col>
        <Col>
          <div className="xpBar">
            <div className="text-center">Fitness</div>
            <Progress value={user.fitnessXp} max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Academic</div>
            <Progress value={user.academicXp} max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Social</div>
            <Progress value={user.socialXp} max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Home</div>
            <Progress value={user.homeXp} max="5" />
          </div>
          <div className="xpBar">
            <div className="text-center">Creativity</div>
            <Progress value={user.creativityXp} max="5" />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Profile;

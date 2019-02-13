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
              this.setState({ user: newUser, newUser: defaultUser });
            });
        } else {
          this.setState({ user });
        }
      });
  }

  componentDidMount() {
    this.newUser();
    userRequests.getCurrentUser(`${authRequests.currentUser()}`)
      .then((user) => {
        this.setState({ user });
      });
  }

  levelUp() {
    const { user } = this.state;
    if (
      user.fitnessXp % 200 === 0
      || user.academicXp % 200 === 0
      || user.socialXp % 200 === 0
      || user.homeXp % 200 === 0
      || user.creativityXp % 200 === 0
    ) {
      console.log('level up!');
      this.updateLevel();
    }
  }

  updateLevel() {
    const { user } = this.state;
    const changes = { ...this.state.user };
    changes.userLevel += 1;
    userRequests.updateUser(changes, user.dbKey);
  }

  render() {
    const { user } = this.state;

    const categoryXp = (category) => {
      const currentXp = category - ((user.userLevel - 1) * 200);
      return currentXp;
    };

    const fitnessXp = categoryXp(user.fitnessXp);
    const academicXp = categoryXp(user.academicXp);
    const socialXp = categoryXp(user.socialXp);
    const homeXp = categoryXp(user.homeXp);
    const creativityXp = categoryXp(user.creativityXp);


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
            <Progress value={fitnessXp} max="200" />
          </div>
          <div className="xpBar">
            <div className="text-center">Academic</div>
            <Progress value={academicXp} max="200" />
          </div>
          <div className="xpBar">
            <div className="text-center">Social</div>
            <Progress value={socialXp} max="200" />
          </div>
          <div className="xpBar">
            <div className="text-center">Home</div>
            <Progress value={homeXp} max="200" />
          </div>
          <div className="xpBar">
            <div className="text-center">Creativity</div>
            <Progress value={creativityXp} max="200" />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Profile;

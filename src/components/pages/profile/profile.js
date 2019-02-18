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

  componentDidUpdate() {
    this.levelUpFitness();
    this.levelUpAcademic();
    this.levelUpSocial();
    this.levelUpHome();
    this.levelUpCreativity();
  }

  levelUpFitness() {
    const { user } = this.state;
    const xpCap = 200;
    if (
      user.fitnessXp > (xpCap * user.userLevel)
    ) {
      this.updateLevel();
    }
  }

  levelUpAcademic() {
    const { user } = this.state;
    const xpCap = 200;
    if (
      user.academicXp > (xpCap * user.userLevel)
    ) {
      this.updateLevel();
    }
  }

  levelUpSocial() {
    const { user } = this.state;
    const xpCap = 200;
    if (
      user.socialXp > (xpCap * user.userLevel)
    ) {
      this.updateLevel();
    }
  }

  levelUpHome() {
    const { user } = this.state;
    const xpCap = 200;
    if (
      user.homeXp > (xpCap * user.userLevel)
    ) {
      this.updateLevel();
    }
  }

  levelUpCreativity() {
    const { user } = this.state;
    const xpCap = 200;
    if (
      user.creativityXp > (xpCap * user.userLevel)
    ) {
      this.updateLevel();
    }
  }

  updateLevel() {
    const { user } = this.state;
    const changes = { ...this.state.user };
    changes.userLevel += 1;
    userRequests.updateUser(changes, user.dbKey);
    userRequests.getCurrentUser(`${authRequests.currentUser()}`)
      .then((data) => {
        this.setState({ user: data });
      });
  }

  render() {
    const { user } = this.state;

    const categoryXp = (category) => {
      let currentXp = category;
      if (category > 2000) {
        currentXp = (category - 2000);
      } else if (category > 1800) {
        currentXp = (category - 1800);
      } else if (category > 1600) {
        currentXp = (category - 1600);
      } else if (category > 1400) {
        currentXp = (category - 1400);
      } else if (category > 1200) {
        currentXp = (category - 1200);
      } else if (category > 1000) {
        currentXp = (category - 1000);
      } else if (category > 800) {
        currentXp = (category - 800);
      } else if (category > 600) {
        currentXp = (category - 600);
      } else if (category > 400) {
        currentXp = (category - 400);
      } else if (category > 200) {
        currentXp = (category - 200);
      }
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

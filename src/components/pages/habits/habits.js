import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import './habits.scss';
import SingleHabit from './singleHabit';
import habitRequests from '../../../helpers/data/habitRequests';
import recordRequests from '../../../helpers/data/recordRequests';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

class Habits extends React.Component {
  state = {
    activeTab: 'fitness',
    habits: [],
    xpRecords: [],
    userInfo: {},
  };

  componentDidMount() {
    this.xpRecords();
    this.userInfo();
    habitRequests.getHabits()
      .then((habits) => {
        this.setState({ habits });
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  xpRecords = () => recordRequests.getAllRecordsWithCategories(`${authRequests.currentUser()}`)
    .then((xpRecords) => {
      this.setState({ xpRecords });
    })

  userInfo = () => userRequests.getCurrentUser(`${authRequests.currentUser()}`)
    .then((userInfo) => {
      this.setState({ userInfo });
    })

  sumOfXp = (typeXp) => {
    const allXp = typeXp.map(xp => xp.xpEarned);
    const totalXp = allXp.reduce((a, b) => a + b, 0);
    return (totalXp);
  };

  calculateFitnessXp = () => {
    const { xpRecords } = this.state;
    const allFitness = xpRecords.filter(xpRecord => xpRecord.category === 'fitness');
    const fitnessXp = this.sumOfXp(allFitness);
    return fitnessXp; // maybe try to make all these one function
  };

  calculateAcademicXp = () => {
    const { xpRecords } = this.state;
    const allAcademic = xpRecords.filter(xpRecord => xpRecord.category === 'academic');
    const academicXp = this.sumOfXp(allAcademic);
    return academicXp;
  };

  calculateSocialXp = () => {
    const { xpRecords } = this.state;
    const allSocial = xpRecords.filter(xpRecord => xpRecord.category === 'social');
    const socialXp = this.sumOfXp(allSocial);
    return socialXp;
  };

  calculateHomelXp = () => {
    const { xpRecords } = this.state;
    const allSHome = xpRecords.filter(xpRecord => xpRecord.category === 'home');
    const homeXp = this.sumOfXp(allSHome);
    return homeXp;
  };

  calculateCreativityXp = () => {
    const { xpRecords } = this.state;
    const allCreativity = xpRecords.filter(xpRecord => xpRecord.category === 'creativity');
    const creativityXp = this.sumOfXp(allCreativity);
    return creativityXp;
  };

  changeUserInfo = () => {
    const changes = { ...this.state.userInfo };
    changes.userLevel = 1;
    changes.fitnessXp = this.calculateFitnessXp();
    changes.academicXp = this.calculateAcademicXp();
    changes.socialXp = this.calculateSocialXp();
    changes.homeXp = this.calculateHomelXp();
    changes.creativityXp = this.calculateCreativityXp();
    return changes;
  };

  updateUserXp = () => {
    const uid = authRequests.currentUser();
    userRequests.getCurrentUser(uid)
      .then((results) => {
        const userId = results.dbKey;
        const changes = this.changeUserInfo();
        userRequests.updateUser(changes, userId);
      });
  };

  formSubmitEvent = (newRecord) => {
    recordRequests.createRecord(newRecord)
      .then(() => {
        this.xpRecords()
          .then(() => {
            this.updateUserXp();
          });
      })
      .catch(err => console.error('error with posting record', err));
  }

  render() {
    const { habits } = this.state;

    const singleHabitCard = (habit => (
      <SingleHabit
        key={habit.id}
        habit={habit}
        onSubmit={this.formSubmitEvent}
        />
    ));

    const fitness = habits.filter(habit => habit.category === 'fitness');
    const academic = habits.filter(habit => habit.category === 'academic');
    const social = habits.filter(habit => habit.category === 'social');
    const home = habits.filter(habit => habit.category === 'home');
    const creativity = habits.filter(habit => habit.category === 'creativity');

    const fitnessHabits = fitness.map(singleHabitCard);
    const academicHabits = academic.map(singleHabitCard);
    const socialHabits = social.map(singleHabitCard);
    const homeHabits = home.map(singleHabitCard);
    const creativityHabits = creativity.map(singleHabitCard);


    return (
      <div className='habits'>
        <div>
          <Nav tabs>
            <NavItem className="tabby">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'fitness' })}
                onClick={() => { this.toggle('fitness'); }}
              >
                Fitness
              </NavLink>
            </NavItem>
            <NavItem className="tabby">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'academic' })}
                onClick={() => { this.toggle('academic'); }}
              >
                Academic
              </NavLink>
            </NavItem>
            <NavItem className="tabby">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'social' })}
                onClick={() => { this.toggle('social'); }}
              >
                Social
              </NavLink>
            </NavItem>
            <NavItem className="tabby">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'home' })}
                onClick={() => { this.toggle('home'); }}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem className="tabby">
              <NavLink
                className={classnames({ active: this.state.activeTab === 'creativity' })}
                onClick={() => { this.toggle('creativity'); }}
              >
                Creativity
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="fitness">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {fitnessHabits}
              </div>
            </TabPane>
            <TabPane tabId="academic">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {academicHabits}
              </div>
            </TabPane>
            <TabPane tabId="social">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {socialHabits}
              </div>
            </TabPane>
            <TabPane tabId="home">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {homeHabits}
              </div>
            </TabPane>
            <TabPane tabId="creativity">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {creativityHabits}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Habits;

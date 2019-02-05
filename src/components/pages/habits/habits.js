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

class Habits extends React.Component {
  state = {
    activeTab: 'fitness',
    habits: [],
  };


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    habitRequests.getHabits()
      .then((habits) => {
        this.setState({ habits });
      });
  }

  formSubmitEvent = (newRecord) => {
    recordRequests.createRecord(newRecord)
      .then()
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
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'fitness' })}
                onClick={() => { this.toggle('fitness'); }}
              >
                Fitness
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'academic' })}
                onClick={() => { this.toggle('academic'); }}
              >
                Academic
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'social' })}
                onClick={() => { this.toggle('social'); }}
              >
                Social
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'home' })}
                onClick={() => { this.toggle('home'); }}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
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

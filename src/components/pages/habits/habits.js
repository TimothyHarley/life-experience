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

class Habits extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'fitness',
      habits: [],
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  category(habitTab) {
    if (this.state.activeTab === habitTab) {
      habitRequests.getHabits(this.state.activeTab)
        .then((habits) => {
          this.setState({ habits });
        });
    }
  }

  componentDidMount() {
    habitRequests.getHabits(this.state.activeTab)
      .then((habits) => {
        this.setState({ habits });
      });
  }

  render() {
    const { habits } = this.state;
    const singleHabitCards = habits.map(habit => (
      <SingleHabit
        key={habit.id}
        habit={habit}
        />
    ));

    return (
      <div className='habits'>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'fitness' })}
                onClick={() => { this.toggle('fitness'); this.category('fitness'); }}
              >
                Fitness
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'academic' })}
                onClick={() => { this.toggle('academic'); this.category('academic'); }}
              >
                Academic
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'social' })}
                onClick={() => { this.toggle('social'); this.category('social'); }}
              >
                Social
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'home' })}
                onClick={() => { this.toggle('home'); this.category('home'); }}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'creativity' })}
                onClick={() => { this.toggle('creativity'); this.category('creativity'); }}
              >
                Creativity
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="fitness">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {singleHabitCards}
              </div>
            </TabPane>
            <TabPane tabId="academic">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {singleHabitCards}
              </div>
            </TabPane>
            <TabPane tabId="social">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {singleHabitCards}
              </div>
            </TabPane>
            <TabPane tabId="home">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {singleHabitCards}
              </div>
            </TabPane>
            <TabPane tabId="creativity">
              <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
                {singleHabitCards}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Habits;

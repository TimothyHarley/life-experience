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
      habitRequests.getHabits(this.state.activeTab)
        .then((habits) => {
          this.setState({ habits });
        });
    }
  }

  // componentDidMount() {
  //   habitRequests.getHabits(this.state.activeTab)
  //     .then((habits) => {
  //       this.setState({ habits });
  //     });
  // }

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
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Habits;

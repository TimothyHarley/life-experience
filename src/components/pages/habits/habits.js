import React from 'react';
import './habits.scss';
import SingleHabit from './singleHabit';
import habitRequests from '../../../helpers/data/habitRequests';

class Habits extends React.Component {
  state = {
    habits: [],
  }

  componentDidMount() {
    habitRequests.getHabits('fitness')
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
        <h2>Habits</h2>
        <div className='habitCardContainer d-flex flex-wrap justify-content-center'>
          {singleHabitCards}
        </div>
      </div>
    );
  }
}

export default Habits;

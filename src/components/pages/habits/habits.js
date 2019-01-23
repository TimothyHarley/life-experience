import React from 'react';
import './habits.scss';
import habitRequests from '../../../helpers/data/habitRequests';

class Habits extends React.Component {
  state = {
    habits: [],
  }

  componentDidMount() {
    habitRequests.getHabits()
      .then((habits) => {
        this.setState({ habits });
      });
  }

  render() {
    const { habits } = this.state;
    console.log(habits);

    return (
      <div className="habits">
        <h2>Habits</h2>
      </div>
    );
  }
}

export default Habits;

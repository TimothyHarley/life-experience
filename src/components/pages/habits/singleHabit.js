import React from 'react';

import './singleHabit.scss';
import RecordModal from '../records/recordModal';

class SingleHabit extends React.Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { habit, onSubmit } = this.props;

    return (
    <div className="habitCard p-4">
      <div className="habitCard">
        <button className="habitButton ff7" onClick={this.toggle}>
          <p>{habit.description}</p>
        </button>
      </div>
      <RecordModal
        isOpen={this.state.modal}
        modal={this.state.modal}
        toggle={this.toggle}
        habit={habit}
        onSubmit={onSubmit} />
    </div>
    );
  }
}

export default SingleHabit;

import React from 'react';
import {
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
} from 'reactstrap';

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
      <Card inverse>
        <button className="habitButton" onClick={this.toggle}>
          <CardImg src="https://upload.wikimedia.org/wikipedia/commons/3/30/Blue_ice_from_Furka_glacier%2C_Switzerland.jpg" alt="Card image cap" />
          <CardImgOverlay>
            <CardTitle className="p-4">{habit.description}</CardTitle>
          </CardImgOverlay>
        </button>
      </Card>
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

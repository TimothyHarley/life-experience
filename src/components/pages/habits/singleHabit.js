import React from 'react';
import {
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
} from 'reactstrap';

import './singleHabit.scss';

class SingleHabit extends React.Component {
  render() {
    const { habit } = this.props;
    return (
      <div className="habitCard p-4">
        <Card inverse>
          <CardImg src="https://upload.wikimedia.org/wikipedia/commons/3/30/Blue_ice_from_Furka_glacier%2C_Switzerland.jpg" alt="Card image cap" />
          <CardImgOverlay>
            <CardTitle className="p-4">{habit.description}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  }
}

export default SingleHabit;

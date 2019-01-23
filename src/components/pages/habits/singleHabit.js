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
      <div>
      <Card inverse>
        <CardImg width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666" alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle>{habit.description}</CardTitle>
        </CardImgOverlay>
      </Card>
    </div>
    );
  }
}

export default SingleHabit;

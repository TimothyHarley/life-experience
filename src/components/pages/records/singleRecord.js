import React from 'react';
import moment from 'moment';
import './singleRecord.scss';

class SingleRecord extends React.Component {
  render() {
    const { record } = this.props;
    return (
      <div>
        <div className="record">
          <p>{moment(record.timestamp).format('MMMM Do, YYYY')} - {record.description} - {record.timeSpent} minutes</p>
        </div>
      </div>
    );
  }
}

export default SingleRecord;

import React from 'react';
import moment from 'moment';
import './singleRecord.scss';

class SingleRecord extends React.Component {
  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleRecord, record } = this.props;
    deleteSingleRecord(record.id);
  }

  render() {
    const { record } = this.props;
    return (
      <div>
        <div className="record">
          <p>
            {moment(record.timestamp).format('MMMM Do, YYYY')} - {record.description} - {record.timeSpent} minutes
            <span>
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt text-danger"></i>
              </button>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default SingleRecord;

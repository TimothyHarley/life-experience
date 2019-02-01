import React from 'react';
import moment from 'moment';
import './singleRecord.scss';

class SingleRecord extends React.Component {

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleRecord, record } = this.props;
    deleteSingleRecord(record.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passRecordToEdit, record } = this.props;
    passRecordToEdit(record.id);
    this.props.toggle();
  }

  render() {
    const { record } = this.props;
    const timedHabit = () => {
      if (record.timeSpent !== '') {
        return (
          <span> - {record.timeSpent} minutes</span>
        );
      }
      return '';
    };

    return (
      <div>
        <div className="record">
          <p>
            {moment(record.timestamp).format('MMMM Do, YYYY')} - {record.description} {timedHabit()}
            <span>
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-edit text-warning"></i>
              </button>
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

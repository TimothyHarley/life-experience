import React from 'react';
import moment from 'moment';
import './singleRecord.scss';
import RecordModal from './recordModal';
import habitRequests from '../../../helpers/data/habitRequests';
import authRequests from '../../../helpers/data/authRequests';
import recordRequests from '../../../helpers/data/recordRequests';

class SingleRecord extends React.Component {
  state = {
    modal: false,
    isEditing: false,
    editId: '-1',
    habit: {},
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  passRecordToEdit = recordId => this.setState({ isEditing: true, editId: recordId });

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleRecord, record } = this.props;
    deleteSingleRecord(record.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { record } = this.props;
    this.habitOfRecord(record.habitId);
    this.passRecordToEdit(record.id);
    this.toggle();
  }

  habitOfRecord = (habitId) => {
    habitRequests.getSingleHabit(habitId)
      .then((habit) => {
        const aHabit = habit.data;
        aHabit.id = habitId;
        this.setState({ habit: aHabit });
      });
  }

  formSubmitEvent = (newRecord) => {
    const { editId } = this.state;
    const uid = authRequests.currentUser();
    this.toggle();
    recordRequests.updateRecord(newRecord, editId)
      .then(() => {
        recordRequests.getAllRecordsWithCategories(uid)
          .then((records) => {
            this.setState({ records, editId: '-1' });
          });
      })
      .catch(err => console.error('error with edit', err));
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
        <div>
          <RecordModal
          isOpen={this.state.modal}
          modal={this.state.modal}
          toggle={this.toggle}
          onSubmit={this.formSubmitEvent}
          habit={this.state.habit}
          isEditing={this.state.isEditing}
          editId={this.state.editId} />
        </div>
      </div>
    );
  }
}

export default SingleRecord;

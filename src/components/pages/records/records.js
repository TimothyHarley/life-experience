import React from 'react';
import './records.scss';
import recordRequests from '../../../helpers/data/recordRequests';
import SingleRecord from './singleRecord';
import authRequests from '../../../helpers/data/authRequests';
import RecordModal from './recordModal';
import habitRequests from '../../../helpers/data/habitRequests';

class Records extends React.Component {
  state = {
    records: [],
    habits: [],
    modal: false,
    isEditing: false,
    editId: '-1',
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    const uid = authRequests.currentUser();
    recordRequests.getAllRecordsWithCategories(uid)
      .then((records) => {
        this.setState({ records });
      });
    habitRequests.getAllHabits()
      .then((habits) => {
        this.setState({ habits });
      });
  }

  deleteOne = (recordId) => {
    recordRequests.deleteRecord(recordId)
      .then(() => {
        const uid = authRequests.currentUser();
        recordRequests.getAllRecordsWithCategories(uid)
          .then((records) => {
            this.setState({ records });
          });
      })
      .catch(error => console.error('delete record error', error));
  }

  passRecordToEdit = recordId => this.setState({ isEditing: true, editId: recordId });

  formSubmitEvent = (newRecord) => {
    const { editId } = this.state;
    const uid = authRequests.currentUser();
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
    const {
      records,
      habits,
      isEditing,
      editId,
    } = this.state;
    const fitness = records.filter(record => record.category === 'fitness');
    const fitnessRecords = fitness.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          toggle={this.toggle}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const academic = records.filter(record => record.category === 'academic');
    const academicRecords = academic.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          toggle={this.toggle}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const social = records.filter(record => record.category === 'social');
    const socialRecords = social.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          toggle={this.toggle}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const home = records.filter(record => record.category === 'home');
    const homeRecords = home.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          toggle={this.toggle}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const creativity = records.filter(record => record.category === 'creativity');
    const creativityRecords = creativity.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          toggle={this.toggle}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));

    return (
      <div>
        <div className="records">
          <h2>Fitness</h2>
          {fitnessRecords}
          <h2>Academic</h2>
          {academicRecords}
          <h2>Social</h2>
          {socialRecords}
          <h2>Home</h2>
          {homeRecords}
          <h2>Creativity</h2>
          {creativityRecords}
        </div>
        <div>
          <RecordModal
          isOpen={this.state.modal}
          modal={this.state.modal}
          toggle={this.toggle}
          onSubmit={this.formSubmitEvent()}
          habit={habits}
          isEditing={isEditing}
          editId={editId} />
        </div>
      </div>
    );
  }
}

export default Records;

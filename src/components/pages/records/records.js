import React from 'react';
import './records.scss';
import recordRequests from '../../../helpers/data/recordRequests';
import SingleRecord from './singleRecord';
import authRequests from '../../../helpers/data/authRequests';

class Records extends React.Component {
  state = {
    records: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    const uid = authRequests.currentUser();
    recordRequests.getAllRecordsWithCategories(uid)
      .then((records) => {
        this.setState({ records });
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

  render() {
    const {
      records,
      isEditing,
      editId,
    } = this.state;
    const fitness = records.filter(record => record.category === 'fitness');
    const fitnessRecords = fitness.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const academic = records.filter(record => record.category === 'academic');
    const academicRecords = academic.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const social = records.filter(record => record.category === 'social');
    const socialRecords = social.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const home = records.filter(record => record.category === 'home');
    const homeRecords = home.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));
    const creativity = records.filter(record => record.category === 'creativity');
    const creativityRecords = creativity.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          deleteSingleRecord={this.deleteOne}
          passRecordToEdit={this.passRecordToEdit}
          />
    ));

    return (
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
    );
  }
}

export default Records;

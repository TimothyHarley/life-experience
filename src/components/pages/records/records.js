import React from 'react';
import './records.scss';
import recordRequests from '../../../helpers/data/recordRequests';
import SingleRecord from './singleRecord';
import authRequests from '../../../helpers/data/authRequests';

class Records extends React.Component {
  state = {
    records: [],
  }

  loadRecords = () => {
    const uid = authRequests.currentUser();
    recordRequests.getAllRecordsWithCategories(uid)
      .then((records) => {
        this.setState({ records });
      });
  }

  componentDidMount() {
    this.loadRecords();
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

  render() {
    const { records } = this.state;

    const singleRecord = (record => (
      <SingleRecord
        key={record.id}
        record={record}
        deleteSingleRecord={this.deleteOne}
        loadRecords={this.loadRecords}
        />
    ));

    const fitness = records.filter(record => record.category === 'fitness');
    const academic = records.filter(record => record.category === 'academic');
    const social = records.filter(record => record.category === 'social');
    const home = records.filter(record => record.category === 'home');
    const creativity = records.filter(record => record.category === 'creativity');

    const fitnessRecords = fitness.map(singleRecord);
    const academicRecords = academic.map(singleRecord);
    const socialRecords = social.map(singleRecord);
    const homeRecords = home.map(singleRecord);
    const creativityRecords = creativity.map(singleRecord);

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
      </div>
    );
  }
}

export default Records;

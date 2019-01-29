import React from 'react';
import './records.scss';
import recordRequests from '../../../helpers/data/recordRequests';
import SingleRecord from './singleRecord';
import authRequests from '../../../helpers/data/authRequests';

class Records extends React.Component {
  state = {
    records: [],
  }

  componentDidMount() {
    const uid = authRequests.currentUser();
    recordRequests.getAllRecordsWithCategories(uid)
      .then((records) => {
        this.setState({ records });
      });
  }

  render() {
    const { records } = this.state;
    const Record = records.map(record => (
        <SingleRecord
          key={record.id}
          record={record}
          />
    ));

    return (
      <div className="records">
        <h2>Records</h2>
        {Record}
      </div>
    );
  }
}

export default Records;

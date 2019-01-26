import axios from 'axios';
import moment from 'moment';
import apiKeys from '../apiKeys';
import userRequests from './userRequests';
import habitRequests from './habitRequests';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRecords = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/records.json`)
    .then((result) => {
      const recordsArray = [];
      const recordsObj = result.data;
      if (recordsObj !== null) {
        Object.keys(recordsObj).forEach((record) => {
          recordsObj[record].id = record;
          recordsArray.push(recordsObj[record]);
        });
        recordsArray.sort((a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix());
      }
      resolve(recordsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllRecordsWithCategories = () => new Promise((resolve, reject) => {
  let habits = [];
  habitRequests.getHabits()
    .then((hbts) => {
      habits = hbts;
      getAllRecords()
        .then((rcrds) => {
          const records = rcrds.map(rcrd => Object.assign(
            { ...habits.find(x => x.category === rcrd.category), ...rcrd },
          ));
          resolve(records);
        });
    })
    .catch(error => reject(error));
});

export default {
  getAllRecords,
  getAllRecordsWithCategories,
};

import axios from 'axios';
import moment from 'moment';
import apiKeys from '../apiKeys';

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
  // stuff goes here //
});

export default {
  getAllRecords,
};

import axios from 'axios';
import moment from 'moment';
import apiKeys from '../apiKeys';
import habitRequests from './habitRequests';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRecords = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/records.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const recordsArray = [];
      const recordsObj = result.data;
      if (recordsObj !== null) {
        Object.keys(recordsObj).forEach((record) => {
          recordsObj[record].id = record;
          recordsArray.push(recordsObj[record]);
        });
        recordsArray.sort((a, b) => moment(b.timestamp).unix() - moment(a.timestamp).unix());
      }
      resolve(recordsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllRecordsWithCategories = uid => new Promise((resolve, reject) => {
  let habits = [];
  habitRequests.getAllHabits()
    .then((hbts) => {
      habits = hbts;
      getAllRecords(uid)
        .then((rcrds) => {
          const records = rcrds.map(rcrd => Object.assign(
            { ...habits.find(x => x.id === rcrd.habitId), ...rcrd },
          ));
          resolve(records);
        });
    })
    .catch(error => reject(error));
});

const getSingleRecord = recordId => axios.get(`${firebaseUrl}/records/${recordId}.json`);

const deleteRecord = recordId => axios.delete(`${firebaseUrl}/records/${recordId}.json`);

const createRecord = record => axios.post(`${firebaseUrl}/records.json`, record);

const updateRecord = (editedRecord, recordId) => axios.put(`${firebaseUrl}/records/${recordId}.json`, editedRecord);

export default {
  getAllRecords,
  getAllRecordsWithCategories,
  getSingleRecord,
  deleteRecord,
  createRecord,
  updateRecord,
};

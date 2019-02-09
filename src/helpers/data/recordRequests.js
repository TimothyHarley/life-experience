import axios from 'axios';
import moment from 'moment';
import apiKeys from '../apiKeys';
import habitRequests from './habitRequests';
import authRequests from './authRequests';
import userRequests from './userRequests';

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

const xpRecords = () => getAllRecordsWithCategories(`${authRequests.currentUser()}`)
  .then()
  .catch(error => console.error('xpRecord error', error));

const userInfo = () => userRequests.getCurrentUser(`${authRequests.currentUser()}`)
  .then()
  .catch(error => console.error('userInfo error', error));

const sumOfXp = (typeXp) => {
  const allXp = typeXp.map(xp => xp.xpEarned);
  const totalXp = allXp.reduce((a, b) => a + b, 0);
  return (totalXp);
};

const calculateFitnessXp = () => {
  const recordsToFilter = xpRecords();
  console.log(recordsToFilter);
  const allFitness = recordsToFilter.filter(xpRecord => xpRecord.category === 'fitness');
  const fitnessXp = sumOfXp(allFitness);
  return fitnessXp; // maybe try to make all these one function
};

const calculateAcademicXp = () => {
  const allAcademic = xpRecords.filter(xpRecord => xpRecord.category === 'academic');
  const academicXp = sumOfXp(allAcademic);
  return academicXp;
};

const calculateSocialXp = () => {
  const allSocial = xpRecords.filter(xpRecord => xpRecord.category === 'social');
  const socialXp = sumOfXp(allSocial);
  return socialXp;
};

const calculateHomelXp = () => {
  const allSHome = xpRecords.filter(xpRecord => xpRecord.category === 'home');
  const homeXp = sumOfXp(allSHome);
  return homeXp;
};

const calculateCreativityXp = () => {
  const allCreativity = xpRecords.filter(xpRecord => xpRecord.category === 'creativity');
  const creativityXp = sumOfXp(allCreativity);
  return creativityXp;
};

const changeUserInfo = () => {
  const changes = userInfo;
  changes.userLevel = 2;
  changes.fitnessXp = calculateFitnessXp();
  changes.academicXp = calculateAcademicXp();
  changes.socialXp = calculateSocialXp();
  changes.homeXp = calculateHomelXp();
  changes.creativityXp = calculateCreativityXp();
  return changes;
};

const updateUserXp = () => {
  const uid = authRequests.currentUser();
  userRequests.getCurrentUser(uid)
    .then((results) => {
      const userId = results.dbKey;
      const changes = changeUserInfo();
      userRequests.updateUser(changes, userId);
    });
};

export default {
  getAllRecords,
  getAllRecordsWithCategories,
  getSingleRecord,
  deleteRecord,
  createRecord,
  updateRecord,
  updateUserXp,
};

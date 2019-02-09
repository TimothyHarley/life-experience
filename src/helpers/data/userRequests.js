import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getCurrentUser = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      let myUser;
      Object.keys(result.data).forEach((key) => {
        myUser = result.data[key];
        myUser.dbKey = key;
      });
      resolve(myUser);
    })
    .catch((error) => {
      reject(error);
    });
});

const createNewUser = user => axios.post(`${firebaseUrl}/users.json`, user);

const updateUser = (changes, userId) => axios.put(`${firebaseUrl}/users/${userId}.json`, changes);

export default {
  getCurrentUser,
  createNewUser,
  updateUser,
};

import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createNewUser = user => axios.post(`${firebaseUrl}/users.json`, user);

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

export default {
  createNewUser,
  getCurrentUser,
};

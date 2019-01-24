import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getHabits = category => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/habitData.json?orderBy="category"&equalTo="${category}"`)
    .then((results) => {
      const habitsArray = [];
      const habitsObj = results.data;
      if (habitsObj !== null) {
        Object.keys(habitsObj).forEach((habit) => {
          habitsObj[habit].id = habit;
          habitsArray.push(habitsObj[habit]);
        });
      }
      resolve(habitsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getHabits,
};
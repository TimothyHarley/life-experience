import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getHabits = category => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/habits.json?orderBy="category"&equalTo="${category}"`)
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

const getAllHabits = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/habits.json`)
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

const getSingleHabit = habitId => axios.get(`${firebaseUrl}/habits/${habitId}.json`);

export default {
  getHabits,
  getAllHabits,
  getSingleHabit,
};

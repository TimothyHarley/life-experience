import firebase from 'firebase';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const logoutUser = () => firebase.auth().signOut();

const currentUser = () => firebase.auth().currentUser.uid;

const userProfile = () => firebase.auth().currentUser;

export default {
  authenticate,
  logoutUser,
  currentUser,
  userProfile,
};

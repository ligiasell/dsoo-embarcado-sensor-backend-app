import { request } from '../../core/constants';
import { firebase as firebaseInstance } from '../../core/firebase';

import users from '../../utils/mocks/userList';
import { doSignInWithEmailAndPassword, getUser, recoverPasswordWithEmail, verifyCode, changePasswordWithCode } from './authfirebase';

const timeNow = Date.now || function () {
  return new Date().getTime();
};

const timeDelay = (minTime) => {
  const stamp = timeNow();
  let timer = setTimeout;
  return (callback) => {
    if ((timeNow() - stamp) < minTime) {
      timer(() => {
        callback();
        timer = null;
      }, minTime - (timeNow() - stamp));
    } else {
      callback();
      timer = null;
    }
  };
};

export const logout = (body) => (dispatch, store) => {
  firebaseInstance.auth().signOut().then(() => {
    localStorage.removeItem('vacininha-jwt');
    localStorage.removeItem('vacininha-jwt-uid');
    dispatch({ type: 'LOGIN_SIGN_OUT' });
    dispatch({ type: 'APP_DESTROY_SESSION' });
  });
};

export const login = (body) => (dispatch, store) => {
  if (!body) return;
  let delay = timeDelay(1500);
  return new Promise((resolve, reject) => {
    let user = body.user;
    if (user) {
      user.getIdToken(true).then((idToken) => {
        localStorage.setItem('vacininha-jwt', idToken);
        localStorage.setItem('vacininha-jwt-uid', user.uid);

        request.defaults.headers['Authorization'] = 'Bearer ' + idToken;
        request.defaults.headers['Uid_firebase'] = user.uid;
        delay(() => {
          if (idToken) { 
            dispatch({ type: 'LOGIN_SUCCESS' });
            dispatch({
              type: 'APP_SET_USER',
              payload: user
            });
            resolve();
          }
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  });
};

export const checkLogin = () => (dispatch, store) => {
  if (localStorage.getItem('vacininha-jwt')) {
    dispatch({ type: 'LOGIN_SUCCESS' });
    dispatch({
      type: 'APP_SET_USER',
      payload: users.filter((item) => item.email == localStorage.getItem('vacininha-jwt'))[0]
    });
  }
};

export const isFBCodeValid = (body) => (dispatch, store) => {
  verifyCode(body).then((fbResponse) => {
    let typeResponse = (fbResponse) ? 'CODE_VALID' : 'CODE_INVALID'; 
    dispatch({ type: typeResponse});
  });
};

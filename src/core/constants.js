import axios from 'axios'; 
import { firebase as firebaseInstance } from './firebase';

export const apiUrl = BASE_API_URL;

export const request = axios.create({
  baseURL: apiUrl,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('vacininha-jwt'),
    'Uid_firebase': localStorage.getItem('vacininha-jwt-uid')
  }
});

// let savedRequest = [];

request.interceptors.request.use((requestData) => {
  return new Promise((resolve) => {
    firebaseInstance.auth().onAuthStateChanged((user) => {
      if (!user) {
        resolve(requestData);
        return;
      }
      user.getIdToken(true).then((idToken) => {

        localStorage.setItem('vacininha-jwt', idToken);
        request.defaults.headers['Authorization'] = 'Bearer ' + idToken;
        requestData.headers['Authorization'] = 'Bearer ' + idToken;

        localStorage.setItem('vacininha-jwt-uid', user.uid);
        request.defaults.headers['Uid_firebase'] = user.uid;
        requestData.headers['Uid_firebase'] = user.uid;

        resolve(requestData);
      });
    });
  });
}, (error) => {
  return Promise.reject(error);
});

request.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status == 401) {
    localStorage.removeItem('vacininha-jwt');
    localStorage.removeItem('vacininha-jwt-uid');
    let url = location.href;
    if (url.includes('login')) return;
    let folder = '';
    if (location.origin === 'http://stage.workandcode.com') folder = '/packiot';
    if (location.origin === 'http://dev.workandcode.com') folder = '/packiot';
    if (location.origin === 'http://app.packiot.com') folder = '/';
    if (location.origin === 'https://app.packiot.com') folder = '/';
    location.href = location.origin + folder + '/login';
  }
  return Promise.reject(error);
});

export const colors = {
  primary: {
    blue: '#539FE9',
    red: '#ED7671',
    grey: '#888F9D',
    green: '#55CF9C'
  },
  secondary: ['#D678F7', '#7CEC87', '#F3AC76', '#63ADF5', '#BCBFC5']
};

import { auth } from '../../core/firebase';
import { firebase as firebaseInstance } from '../../core/firebase';

export const doSignInWithEmailAndPassword = (email, password) => {
  return firebaseInstance.auth().setPersistence(firebaseInstance.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebaseInstance.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // let errorCode = error.code;
      // let errorMessage = error.message;
    });
};

export const recoverPasswordWithEmail = (email) =>{
  return firebaseInstance.auth().sendPasswordResetEmail(
    email)
    .then(function() {
      return true;
    })
    .catch(function(error) {
      return false;
    });

};

export const changePasswordWithCode = (code , password) => {
  return firebaseInstance.auth().confirmPasswordReset(code, password)
    .then(function() {
      // Success
      return true;
    })
    .catch(function() {
      // Invalid code
      return false;
    })
};

export const verifyCode = (code) => {
  return firebaseInstance.auth().verifyPasswordResetCode(code)
  .then(function(email) {
    return true;
  })
  .catch(function() {
    return false;
  })

}

export const getToken = () => auth.currentUser.getIdToken(true);

export const getUser = () => auth.currentUser;

export const getCurrentUserByUid = () => auth;

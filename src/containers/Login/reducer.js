function uuid() {
  let time = () => new Date();
  let uuid = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + time().getTime();
  return uuid();
};

const initialState = {
  eventKey: uuid(),
  isSuccess: false,
  isCodeValid: true,
  isRecoverSuccess: -1,
  isPasswordChangeSuccess: -1,
  user: null,
};

export default (state = initialState, action = {}, foo) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      state = Object.assign({}, state, {
        eventKey: uuid(),
        isSuccess: true
      });
      break;
    case 'LOGIN_SIGN_OUT':
      state = Object.assign({}, state, {
        eventKey: uuid(),
        isSuccess: false
      });
      break;
    case 'LOGIN_ERROR':
      state = Object.assign({}, state, {
        eventKey: uuid(),
        isSuccess: false
      });
      break;
    case 'RECOVER_SUCCESS':
      state = Object.assign({}, state, {
        isRecoverSuccess: 1
      });
      break;
    case 'RECOVER_ERROR':
      state = Object.assign({}, state, {
        isRecoverSuccess: 0
      });
      break;
    case 'PASSWORD_CHANGED_SUCCESS':
      state = Object.assign({}, state, {
        isPasswordChangeSuccess: 1
      });
      break;
    case 'PASSWORD_CHANGED_ERROR':
      state = Object.assign({}, state, {
        isPasswordChangeSuccess: 0
      });
      break;
    case 'CODE_VALID':
      state = Object.assign({}, state, {
        isCodeValid: true
      });
      break;
    case 'CODE_INVALID':
      state = Object.assign({}, state, {
        isCodeValid: false
      });
      break;
    case 'APP_SET_USER':
      state = Object.assign({}, state, {
        user: action.payload
      });
      break;
    default:
      break;
  }
  return state;
};

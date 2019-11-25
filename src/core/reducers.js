import { combineReducers } from 'redux';

import Login from '../containers/Login/reducer';
import Carteirinha from '../containers/Carteirinha/reducer';

const reducers = combineReducers({
  carteirinha: Carteirinha,
  login: Login
});

export default (state, action) => {
  // Reset all states when users logging out or token is missing
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }
  return reducers(state, action);
};

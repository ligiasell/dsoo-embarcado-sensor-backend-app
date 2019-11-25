const initialState = {
  isSessionActive: null, 
  loggedUser: null, 
  currentUser: null,
  carteirinhasData: [],
  measureDatas: [],
  vaccinesData: [],
  currentUserId: null,
  isFetching: {
    medidas: false,
    carteirinhas: false,
    vacinas: false
  }
};

export default (state = initialState, action = {}) => {

  switch (action.type) {
  case 'IS_FETCHING':
    let isFetching = { ...state.isFetching };
    if (action.dataType === 'all') {
      Object.keys(isFetching).forEach((item) => isFetching[item] = action.payload);
    } else {
      isFetching = { ...isFetching, ...{ [action.dataType]: action.payload } };
    }
    state = { ...state, ...{ isFetching: isFetching } };
    break;
  case 'SET_CURRENT_USER':
    state = Object.assign({}, state, { 
      currentUser: action.payload
    });
    break;
  case 'APP_SET_USER':
    state = Object.assign({}, state, { 
      loggedUser: action.payload
    });
    break;
  case 'APP_DESTROY_SESSION':
    state = Object.assign({}, state, {
      isSessionActive: false,
      loggedUser: null
    });
    break;
  case 'LOGIN_SIGN_OUT':
    state = initialState;
    break;
  case 'MEASURE_DATAS':
    state = Object.assign({}, state, {
      measureDatas: action.payload
    });
    break;  
  case 'CARTEIRAS_DATA':
    state = Object.assign({}, state, { 
      carteirinhasData: action.payload
    });
    break;
  case 'VACCINES_DATA':
    state = Object.assign({}, state, { 
      vaccinesData: action.payload
    });
    break;
  case 'CURRENT_USER_ID':
    state = Object.assign({}, state, { 
      currentUserId: action.payload
    }); 
    break;
    
    case 'MEASURE_UPDATE_DATAS':
     console.log(state);
      break;  
  default:
    break;
  }
  return state;
};

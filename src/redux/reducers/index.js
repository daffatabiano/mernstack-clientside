import { combineReducers } from 'redux';

import userReducer from './userReducers';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';

import userReducer from './userReducers';
import cartReducers from './cartReducers';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducers,
});

export default rootReducer;

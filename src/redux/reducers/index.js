import { combineReducers } from 'redux';

import userReducer from './userReducers';
import cartReducers from './cartReducers';
import notificationReducers from './notificationReducers';
import loadingReducers from './loadingReducers';
import postReducers from './api/postReducers';
import fetchReducers from './api/fetchReducers';
import deleteReducers from './api/deleteReducers';
import putReducers from './api/putReducers';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducers,
  notification: notificationReducers,
  loading: loadingReducers,
  [postReducers.reducerPath]: postReducers.reducer,
  [fetchReducers.reducerPath]: fetchReducers.reducer,
  [deleteReducers.reducerPath]: deleteReducers.reducer,
  [putReducers.reducerPath]: putReducers.reducer,
});

export default rootReducer;

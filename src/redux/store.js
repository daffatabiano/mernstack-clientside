import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { combineMiddleware } from './middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (GDM) => {
    return GDM().concat(...combineMiddleware);
  },
});

export default store;

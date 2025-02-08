import { deleteMiddleware } from './reducers/api/deleteReducers';
import { fetchMiddleware } from './reducers/api/fetchReducers';
import { postMiddleware } from './reducers/api/postReducers';

export const combineMiddleware = [
  postMiddleware,
  fetchMiddleware,
  deleteMiddleware,
];

import { fetchMiddleware } from './reducers/api/fetchReducers';
import { postMiddleware } from './reducers/api/postReducers';

export const combineMiddleware = [postMiddleware, fetchMiddleware];

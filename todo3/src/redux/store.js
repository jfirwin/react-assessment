import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer.js';
import  { initialState } from './initialState.js';
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(promiseMiddleware())
);

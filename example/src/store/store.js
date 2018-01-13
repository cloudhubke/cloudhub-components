import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

export const store = createStoreWithMiddleware(reducers);

export const axiosinstance = () => {
  const token = '_';
  if (token) {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }
  return axios.create();
};

export const CONFIG = {
  // API_ENDPOINT: "https://www.m-tally.com",
  // API_ENDPOINT: 'http://192.168.0.3:1337',
  API_ENDPOINT: '/api'
};

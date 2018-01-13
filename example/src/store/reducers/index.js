import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import bank from './bankReducer';

const rootReducer = combineReducers({
  form: formReducer,
  bank
});

export default rootReducer;

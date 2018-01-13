import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import ContactForm from './ContactForm';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
});

const store = createStore(rootReducer);

class App extends Component {
  state = {
    value: 'hello',
  };
  onChange = value => {
    this.setState({ value });
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ value: 'Hello whoever' });
    }, 5000);
  }
  render() {
    return (
      <div>
        <p className="App-intro">Phone Number</p>
        <ContactForm />
      </div>
    );
  }
}

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;

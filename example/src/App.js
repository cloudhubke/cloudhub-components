import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import ContactForm from './ContactForm';
import GridDemo from './GridDemo';
import Bank from './pages/Bank';
import CourseSelector from './pages/CourseSelector';

class App extends Component {
  state = {
    value: 'hello'
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
        <CourseSelector />
        {
          // <ContactForm />
          // <GridDemo />
          // <Bank />
        }
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

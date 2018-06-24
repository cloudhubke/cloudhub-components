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
    console.log('====================================');
    console.log('RENDERING>>>>');
    console.log('====================================');
    return (
      <div style={{ padding: 30 }}>
        {
          // <CourseSelector />
          // <ContactForm />
          // <GridDemo />
          // <Bank />
        }
        <GridDemo />
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

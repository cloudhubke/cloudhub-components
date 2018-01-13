import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Awesome from 'react-ckeditor5';
import { PhoneInput, SimpleQuill } from 'cloudhub-react-components';
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
        <PhoneInput />
        <SimpleQuill />
      </div>
    );
  }
}

export default App;

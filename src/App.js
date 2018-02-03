import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import Wrapper from './Wrapper';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Grid>
          <Wrapper />
        </Grid>
      </Provider>
    );
  }
}

export default App;

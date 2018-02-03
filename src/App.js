import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import HeaderWrapper from './HeaderWrapper';
import TrailerWrapper from './TrailerWrapper';
import './App.css';

class App extends Component {
  render() {
    switch (this.props.step) {
      case 1:
        return (
          <Provider store={store}>
            <Grid>
              <HeaderWrapper />
            </Grid>
          </Provider>
        );
      case 2:
        return (
          <Provider store={store}>
            <Grid>
              <TrailerWrapper />
            </Grid>
          </Provider>
        );
      default:
        return null;
    }
  }
}

App.propTypes = {
  step: PropTypes.number,
};

App.defaultProps = {
  step: 2,
};

export default App;

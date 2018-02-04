import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import HeaderWrapper from './HeaderWrapper';
import DetailWrapper from './DetailWrapper';
import TrailerWrapper from './TrailerWrapper';
import './App.css';

class App extends Component {
  render() {
    switch (this.props.step) {
      case 2:
        return (
          <Provider store={store}>
            <Grid>
              <HeaderWrapper />
            </Grid>
          </Provider>
        );
      case 3:
        return (
          <Provider store={store}>
            <Grid>
              <DetailWrapper />
            </Grid>
          </Provider>
        );
      case 4:
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
  step: 3,
};

export default App;

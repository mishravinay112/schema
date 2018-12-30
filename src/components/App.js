import React from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer } from 'react-notifications';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('../css/components/app.css'); // eslint-disable-line global-require
}

const App = props => (
  <div>
    <NotificationContainer />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;

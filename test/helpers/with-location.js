import React from 'react';
import PropTypes from 'prop-types';

class LocationProvider extends React.Component {
  static propTypes = {
    context: PropTypes.object,
    component: PropTypes.object
  };
  static childContextTypes = {
    location: PropTypes.object
  }

  getChildContext() {
    return {
      location: {
        query: { ref: 'custom reference!' }
      },
      ...this.props.context
    };
  }

  render() {
    return this.props.component;
  }
}

const withContext = (component, context) => <LocationProvider context={context} component={component} />;

export default withContext;

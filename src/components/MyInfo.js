import React from 'react';
import PropTypes from 'prop-types';

const MyInfo = ({ email, name }) => (
  <p>
    Developed By <a href={`mailto:${email}`} title="you can directly give suggestions by this e-mail" >{name}</a>
  </p>
);

MyInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MyInfo;

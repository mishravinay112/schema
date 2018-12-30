import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import PropTypes from 'prop-types';

import { login } from '../actions/session';


// Define stateless component to render input and errors
const renderInput = props => (
  <div className="form-group">
    <If condition={props.label}>
      <label>{props.label}</label>
    </If>
    <input className="form-control" placeholder={props.placeholder} {...props.input} type={props.type}
      style={props.meta.touched && props.meta.error ? { borderColor: '#d9534f', backgroundColor: '', color: '#ffffff' } : {}} />
    <If condition={props.meta.touched && props.meta.error}>
      {props.label || 'field'} is required
    </If>
  </div>);

renderInput.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object
};

class LoginForm extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.onSubmit(values);
  }

  render() {
    const { handleSubmit, submitting, token } = this.props;

    if (token) {
      return null;
    }

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)} name="login">
        <div className="panel panel-default">
          <p className="panel-heading">The operation you were trying to perform requires you to login.</p>
          <div className="panel-body text-left">
            <Field type="text" name="username"
              placeholder="username" label="username" component={renderInput} />
            <Field type="password" name="password" label="password" placeholder="password" component={renderInput} />

            <button type="submit" className="btn btn-default"
              disabled={submitting}>
              Login
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['username', 'password'],
  validate: values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  }
})(connect(
  state => ({
    token: state.session.token
  }),
  dispatch => ({
    onSubmit: values => dispatch(login(values.username, values.password)),
  })
)(LoginForm));


export default LoginForm;

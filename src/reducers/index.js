import { combineReducers } from 'redux';
import employees from './employees';
import session from './session';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  employees,
  session,
  form: formReducer
});

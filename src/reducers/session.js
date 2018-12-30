import { Actions } from '../actions/session';

const initialState = {
  token: null,
  error: null,
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  case Actions.REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true
    };
  case Actions.RECEIVE_TOKEN:
    return {
      ...state,
      isFetching: false,
      token: action.payload,
      error: null,
    };
  case Actions.CLEAR_TOKEN:
    return {
      ...state,
      token: initialState.token
    };
  case Actions.ERROR_TOKEN:
    return {
      ...state,
      isFetching: false,
      error: action.payload
    };
  default: return state;
  }
};

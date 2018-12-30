import { Actions } from '../actions/employees';

export const initialState = {
  isLoading: false,
  error: false,
  data: [],
  lastUpdatedTime: Date.now(),
  selectedId: 0,
  showInput: false,
  name: '',
  surname: '',
  showLoginPage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case Actions.ADD_MORE_ROW: return {
    ...state,
    showInput: true,
    selectedId: '',
    data: [...state.data, {
      id: '',
      name: '',
      surname: ''
    }]
  };
  case Actions.HIDE_LOGIN: return {
    ...state,
    showLoginPage: false,
  };
  case Actions.SHOW_LOGIN: return {
    ...state,
    showLoginPage: true,
  };
  case Actions.RESET_EDIT: return {
    ...state,
    name: '',
    surname: '',
    selectedId: 0,
    showLoginPage: false,
  };
  case Actions.HANDLE_VALUE_CHANGE: return {
    ...state,
    [action.payload.name]: action.payload.value,
  };
  case Actions.SELECT_EMPLOYEEE: return {
    ...state,
    selectedId: action.payload.id,
    showInput: true,
    name: action.payload.Name,
    surname: action.payload.Surname,
  };
  case Actions.REQUEST_EMPLOYEES_DATA: return {
    ...state,
    isLoading: true,
  };
  case Actions.EMPLOYEES_DATA_SUCCESS: return {
    ...state,
    isLoading: false,
    data: action.payload || [],
    lastUpdatedTime: Date.now(),
  };
  case Actions.EMPLOYEES_DATA_FAILURE: return {
    ...state,
    isLoading: false,
    error: true
  };
  default: return state;
  }
};

import api from '../lib/api';
import { find } from 'lodash';
import { NotificationManager } from 'react-notifications';

export const Actions = {
  REQUEST_EMPLOYEES_DATA: 'SCHEMA/EMPLOYEES/REQUEST_EMPLOYEES_DATA',
  EMPLOYEES_DATA_SUCCESS: 'SCHEMA/EMPLOYEES/EMPLOYEES_DATA_SUCCESS',
  EMPLOYEES_DATA_FAILURE: 'SCHEMA/EMPLOYEES/EMPLOYEES_DATA_FAILURE',
  SELECT_EMPLOYEEE: 'SCHEMA/EMPLOYEES/SELECT_EMPLOYEEE',
  HANDLE_VALUE_CHANGE: 'SCHEMA/EMPLOYEES/HANDLE_VALUE_CHANGE',
  RESET_EDIT: 'SCHEMA/EMPLOYEES/RESET_EDIT',
  SHOW_LOGIN: 'SCHEMA/EMPLOYEES/SHOW_LOGIN',
  HIDE_LOGIN: 'SCHEMA/EMPLOYEES/HIDE_LOGIN',
  ADD_MORE_ROW: 'SCHEMA/EMPLOYEEES/ADD_MORE_ROW',
};

export const addMoreRow = () => dispatch => {
  dispatch({
    type: Actions.ADD_MORE_ROW,
  });
};

export const cancelEdit = () => dispatch => dispatch({
  type: Actions.RESET_EDIT,
});

export const handleValueChange = value => dispatch => dispatch({
  type: Actions.HANDLE_VALUE_CHANGE,
  payload: value,
});

export const selectEmployeeToEdit = id => (dispatch, getState) => {
  const employee = find(getState().employees.data, { id });
  dispatch({
    type: Actions.SELECT_EMPLOYEEE,
    payload: employee,
  });
}

export const startEmployeeFetching = () => dispatch => dispatch({
  type: Actions.REQUEST_EMPLOYEES_DATA
});

export const saveEmployeesData = employeesData => dispatch => dispatch({
  type: Actions.EMPLOYEES_DATA_SUCCESS,
  payload: employeesData,
});

export const failedToFetchData = error => dispatch => dispatch({
  type: Actions.EMPLOYEES_DATA_FAILURE,
  payload: error
});

export const resetEdit = () => dispatch => dispatch({
  type: Actions.RESET_EDIT
});

export const fetchEmployees = (forceUpdate = false) => async (dispatch, getState) => {
  const isEmployeesAlreadyAvailable = checkIfEmployeesAlreadyAvailableInStore(getState().employees.data);

  if (!isEmployeesAlreadyAvailable || forceUpdate) {
    dispatch(startEmployeeFetching());
    await api({ url: '/api/Employee' })
    .then(({ data }) => {
      dispatch(saveEmployeesData(data.data));
    })
    .catch(error => {
      dispatch(failedToFetchData(error));
    });
  }
};


export const deleteSelectedEmployee = id => async (dispatch, getState) => {
  if (id === '') {
    dispatch(fetchEmployees(true));
  } else {
    dispatch(startEmployeeFetching());
    if (getState().session.token) {
      await api({
        url: '/api/Employee/'.concat(id),
        method: 'DELETE',
        headers: {
          Authorization: getState().session.token
        }
      })
      .then(({ data }) => {
        dispatch(saveEmployeesData(data.data));
      })
      .catch(error => {
        dispatch(failedToFetchData(error));
      });
    } else {
      dispatch(showLogin(id));
    }
  }
};


const checkIfEmployeesAlreadyAvailableInStore = employees => {
  if (employees.length) {
    return true;
  }

  return false;
};

export const saveEmployeeData = () => (dispatch, getState) => {
  const { selectedId, name, surname } = getState().employees;
  if (getState().session.token && selectedId !== 0) {
    api({
      url: 'api/Employee',
      method: 'POST',
      data: {
        id: selectedId,
        name,
        surname,
      },
      headers: {
        Authorization: getState().session.token
      }
    })
    .then(({ data }) => {
      dispatch(saveEmployeesData(data.data));
      dispatch(resetEdit());
      NotificationManager.success('Employee data updated!');

    });
  } else {
    dispatch(showLogin());
  }
};

export const showLogin = () => dispatch => dispatch({
  type: Actions.SHOW_LOGIN
});

export const hideLogin = () => dispatch => dispatch({
  type: Actions.HIDE_LOGIN
});

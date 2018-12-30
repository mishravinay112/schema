import api from '../lib/api';
import { NotificationManager } from 'react-notifications';
import { saveEmployeeData } from './employees';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('react-notifications/lib/notifications.css'); // eslint-disable-line global-require
}

export const Actions = {
  REQUEST_TOKEN: 'SCHEMA/SESSION/REQUEST_TOKEN',
  RECEIVE_TOKEN: 'SCHEMA/SESSION/RECEIVE_TOKEN',
  ERROR_TOKEN: 'SCHEMA/SESSION/ERROR_TOKEN',
  CLEAR_TOKEN: 'SCHEMA/SESSION/CLEAR_TOKEN',
};

export const requestToken = () => ({
  type: Actions.REQUEST_TOKEN
});

export const receiveToken = token => ({
  type: Actions.RECEIVE_TOKEN,
  payload: token,
});

export const errorToken = error => ({
  type: Actions.ERROR_TOKEN,
  payload: error
});

export const clearToken = () => ({
  type: Actions.CLEAR_TOKEN
});

export const login = (username, password) => async dispatch => {
  dispatch(requestToken());
  await api({
    url: '/token',
    method: 'POST',
    data: {
      username,
      password,
      grant_type: 'password'
    }
  })
  .then(response => {
    if (response.status && response.status === 200) {
      dispatch(receiveToken('Bearer '.concat(response.data.access_token)));
      NotificationManager.success('Login successful');
      dispatch(saveEmployeeData());
    } else {
      dispatch(errorToken());
      NotificationManager.error('login failed: invalid username or password');
    }

    // if (status === 200 && data.status && data.status.code === 200) {
    //   localStorage.setItem('API_KEY', data.data.API_KEY);
    //   localStorage.setItem('ORGANISATION', JSON.stringify(data.data.userClient));
    //   dispatch(receiveToken(data.data.API_KEY));
    //   dispatch(receiveOrganisation({
    //     name: data && data.data && data.data.userClient && data.data.userClient.clientName,
    //     code: data && data.data && data.data.userClient && data.data.userClient.clientCode,
    //     apiKey: data && data.data && data.data.userClient && data.data.userClient.apiKey
    //   }));
    // } else {
    //   dispatch(errorToken(data.status));
    // }
  })
  .catch(() => {
    NotificationManager.error('login failed: invalid username or password');
    dispatch(errorToken());
  });
};


import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState as session } from './../../src/reducers/session';

let store;
const createStore = configureMockStore([thunk]);
const wrapInStore = (Component, initialState) => {
  if (!store) {
    store = createStore({ session, ...initialState });
  }
  return (<Provider store={store}>
    {Component}
  </Provider>);
};

export const getStore = () => store;
export const resetStore = () => store = undefined;

export default wrapInStore;

const jsdom = require('jsdom').JSDOM;

const dom = new jsdom('<!doctype html><html><body></body></html>');

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

global.localStorage = localStorageMock;
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.window.analytics = {
  track: () => 'sample track'
};
global.navigator = {
  userAgent: 'node.js'
};

/* eslint-disable no-console */
console.log('Finished configuring jsdom.');

 /*
  * register babel to use latest syntax.
  */
  require('babel-core/register');

 /*
  * using polyfill to get async functions working.
  *
  * https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
  */
  require('babel-polyfill');

 /*
  * Ignore styles in test environment.
  */
  require('ignore-styles');

  require('./helpers/dom');
  require('./helpers/config-chai-enzyme');

// TODO: test and hack requiring image/assets if required.

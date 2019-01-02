# SCHEMA TEST
Single Page Application using React/Redux that lists all of a company’s
employees.

**Note:** Node v6+ is required for this project.

I recommend using [yarn](https://code.facebook.com/posts/1840075619545360) to manage dependencies. To begin using yarn, install globally with `npm install -g yarn`.

Then simply clone the repository and install using the `yarn` command.

```
git clone https://github.com/mishravinay112/schema.git
cd schema
yarn
```
but still if you don't want to use `yarn`. you can install dependency via `npm`

`npm i`

To build the dev environment with hot reloading of JS and CSS, type:

`npm start`

By default, the site is available at http://localhost:3000.



If you are suggesting a major overhaul of some aspect of this project, please submit an issue with your suggestion on `mishravinay112@gmail.com`.

## Tools Included in this Project

The tools included in this project are:

- React (of course)
- Redux (state management)
- React Router (routing)
- Webpack (bundling assets)
- PostCSS (processing of CSS)
- Stylelint and eslint (recommanded eslint)
- Babel (latest JS)
- Husky (run tasks using git hooks like commit, pre-push)
- Bootsrap & fontawesome (style & icon)
- Mocha/chai/enzyme
- Node
- Express
- Jwt

All of these are currently mainstream tools for building modern JavaScript applications, however, it may be useful to discuss the rationale for the inclusion of some of these tools.

### React
React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.

#### Redux
Redux is both a library and an architecture. It is influenced by Flux, Immutable.js and other prior work. Dan Abramov, the creator of Redux, posted a response on [Stack Overflow](http://stackoverflow.com/questions/32461229/why-use-redux-over-facebook-flux) about how/why Redux may be preferred over Flux. It provides valuable insight into the major benefits of Redux.

### React Router
React Router is a collection of navigational components that compose declaratively with your application. Whether you want to have bookmarkable URLs for your web app or a composable way to navigate in React, React Router works wherever React is rendering.

### Webpack
Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. Webpack takes modules with dependencies and generates static assets representing those modules.

#### PostCSS
If you're familiar with Sass, then writing CSS within this boilerplate project will come easily to you. Although Sass itself is not included, support for Sass syntax has been added due to its popularity. Why not just use Sass? PostCSS can do everything Sass can do, but more. Also, we can do a lot with PostCSS that isn't possible with Sass.

### Eslint
A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

### Babel
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

#### Husky
Note that linting is performed on each commit and tests are run on pre-push. These tasks are courtesy of [husky](https://www.npmjs.com/package/husky). For reference, the husky tasks are in the `scripts` section of `package.json`.

### Bootsrap
Bootstrap is a front-end UI framework for developing websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions.

### Node
Node.js allows the creation of Web servers and networking tools using JavaScript and a collection of "modules" that handle various core functionality. Node.js brings event-driven programming to web servers, enabling development of fast web servers in JavaScript. Developers can create highly scalable servers without using threading, by using a simplified model of event-driven programming that uses callbacks to signal the completion of a task.

### Express
Express.js is a web application framework for Node.js. It is a fast, robust and asynchronous in nature and provides a lot of functionalities. It allows to setup middlewares to respond to HTTP Requests. It defines a routing table which is used to perform different actions based on HTTP method and URL.

### Jwt
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

### Mocha/chai/enzyme
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

#### No Gulp or Grunt
This project uses npm scripts to run the few tasks needed to build and serve the app. The scripts are located in

`package.json`.

#### File structure
The file structure for this project uses a modular pattern that is common in JavaScript projects.

The file structure there is the pattern used through this project. All of the JS and CSS pertaining to that particular component are grouped together in a place according to there purpose and use. This has proven to be a very helpful way of organizing a React/JS project.

If you are worried about "separation of concerns", please see MPJ's [humorous rant](https://www.youtube.com/watch?v=0ZNIQOO2sfA) on the topic.

Another quick note, the components designated as "pages" - HomePage is [container components](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components).

All the backend code exists on server.js. Our codebase uses express.js framework and jwt for authenication. We are not using any database for the storage. Simple onject is used for storage and data will only be available for the time server is up. When server is restarted all the state will be lost.

#### Import of CSS
Take a look at `src/components/App.js`. Near the top of that file you will see a conditional import of the `src/css/components/app.css` file. This is how CSS imports with webpack work.

In a dev environment (what you get when you type `npm start`), the CSS is injected into the `<HEAD>` of the document. A change to CSS will result in the style being quickly hotloaded into the browser - no lengthy rebuilds or refreshes needed.

In a production environment, the CSS files are bundled into a single file, `bundle.css` that is included in the page via the `<LINK>` tag.

Other methods of building and loading CSS have proved slower/clunkier than webpack. However, there is a minor annoyance that comes with webpack.

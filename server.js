import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import jwt from 'jsonwebtoken';
import reactMiddleware from './src/middleware';
import { checkToken, jwtSecretCode } from './jwt-middleware';
import config from './webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

let employees = [{
  id: 1,
  Name: 'Vinay',
  Surname: 'Mishra',
}, {
  id: 2,
  Name: 'Amreen',
  Surname: 'Valli',
}];

let lastEntry = employees.length;

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.resolve(__dirname, 'src')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get('/', reactMiddleware);

app.get('/api/Employee', (req, res) => {
  return res.status(200).json({
    data: employees
  });
});

app.delete('/api/Employee/:id', checkToken, (req, res) => {
  const id = req.params.id;
  const updatedEmployees = findAndRemoveEmployee(id);
  employees.length = 0;
  employees = [...updatedEmployees];
  res.json({
    data: employees
  });
});
app.post('/api/Employee', checkToken, (req, res) => {
  if (!req.body.id) {
    employees.push({
      id: ++lastEntry,
      Name: req.body.name,
      Surname: req.body.surname,
    });
  }

  const updatedEmployees = updateEmployeeList(req.body);
  return res.status(200).json({
    data: updatedEmployees
  });
});

app.post('/token', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const mockedUsername = 'A5E7A574CFE84EBFB45590C3727DECAF';
  const mockedPassword = '757F83E';

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      const token = jwt.sign({ username }, jwtSecretCode, {
        expiresIn: 86399
      });

      // return the JWT token for the future API calls
      res.json({
        expiresIn: 86399,
        token_type: 'bearer',
        access_token: token
      });
    } else {
      res.status(403).json({
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.status(400).json({
      message: 'Authentication failed! Please check the request'
    });
  }
});

const updateEmployeeList = userData => {
  const updatedEmployees = [];
  for (let i = 0; i < employees.length; i++) {
    if (userData.id === employees[i].id) {
      updatedEmployees.push({
        id: userData.id,
        Name: userData.name,
        Surname: userData.surname,
      });
    } else {
      updatedEmployees.push(employees[i]);
    }
  }

  return updatedEmployees;
};

const findAndRemoveEmployee = id => {
  const updatedEmployees = [];
  for (let i = 0; i < employees.length; i++) {
    if (id != employees[i].id) {
      updatedEmployees.push(employees[i]);
    }
  }

  return updatedEmployees;
};

app.listen(3000, '0.0.0.0', err => {
  if (err) {
    console.error(err);
  } else {
    console.info('Listening at http://localhost:3000');
  }
});
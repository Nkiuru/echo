require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const db = require('./src/modules/database');
const users = require('./src/modules/users');
const login = require('./src/modules/login');
const app = express();
const port = 8000;

app.set('trust proxy', 1);
// Handlebars middleware
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials',
    usersDir: 'src/views/users',
  }));

app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');

app.use(users);
app.use(login);

app.get('/users', (req, res) => {
  db.select().then((result) => {
    res.json(result);
    res.end();
  });
});
// Static folder
app.use('/static', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('logregbase', {login: true});
});

app.get('/register', (req, res) => {
  db.getCountries().then((result) => {
    res.render('logregbase', {country: result});
  }).catch((err) => {
    res.render('logregbase', {error: err});
  });
});

if (process.env.hasOwnProperty('HTTPS')) {
  const sslKey = fs.readFileSync(process.env.SSL_KEY);
  const sslCert = fs.readFileSync(process.env.SSL_CERT);

  const options = {
    key: sslKey,
    cert: sslCert,
  };
  http.createServer(app).listen(port);
  https.createServer(options, app).listen(3000, () => {
    console.log(`Server started on port ${port}...`);
  });
} else {
  app.listen(port);
}

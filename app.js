require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const uuid = require('uuid/v4');
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const db = require('./src/modules/database');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

require('./src/authenticate').init(app);
app.use(session({
  genid: (req) => {
    return uuid(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  maxAge: 69000,
}));

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use('/static', express.static(path.join(__dirname, '/dist')));

// app.get('/', getImages);

app.get('/login', (req, res) => {
  res.render('logregbase', { login: true });
});

app.get('/register', (req, res) => {
  db.getCountries().then((result) => {
    res.render('logregbase', { country: result });
  }).catch((err) => {
    res.render('logregbase', { error: err });
  });
});

app.get('/genres', passport.authenticationMiddleware(), (req, res) => {
  db.getGenres().then((genres) => {
    res.json([{ success: true }, genres]);
  });
});

require('./src/user').init(app);
require('./src/post').init(app);

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

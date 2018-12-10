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

// Use the authentication files
require('./src/authenticate').init(app);
/*
* Generate unique identifier, assign a secret and set the age to 69000ms.
*/
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
// Use body parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initialize passport and its session
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use('/static', express.static(path.join(__dirname, '/dist')));

// app.get('/', getImages);

app.get('/login', (req, res) => {
  res.render('logregbase', { login: true });
});
// Render register page with the necessary countries for the select menu
app.get('/register', (req, res) => {
  db.getCountries().then((result) => {
    res.render('logregbase', { country: result });
  }).catch((err) => {
    res.render('logregbase', { error: err });
  });
});

// Endpoint for getting the list of genres
app.get('/genres', passport.authenticationMiddleware(), (req, res) => {
  db.getGenres().then((genres) => {
    res.json([{ success: true }, genres]);
  });
});

app.get('/authenticated', (req, res) => {
  res.send(req.isAuthenticated());
});

// use the user files
require('./src/user').init(app);

// use the post related files
require('./src/post').init(app);

// Start the server using HTTPS if given certs
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

'use strict';

const mysql = require('mysql2');

const connect = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
};

const select = (connection, cb, res) => {
  // simple query
  connection.query(
    'SELECT * FROM user;',
    (err, results, fields) => {
      cb(results, res);
    });
};

const getCountries = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM country;',
      (err, results, fields) => {
        if (err) {
          reject(err);
        }
        if (results) {
          resolve(results);
        }
      });
  });
};

module.exports = {
  connect: connect,
  select: select,
  getCountries: getCountries,
};

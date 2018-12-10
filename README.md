# echo
Music content sharing platform

## Setting up delevopment build
Install [nodejs](https://nodejs.org/en/)

Install [gulp](https://gulpjs.com/)

Install nodemon globally
```npm install -g nodemon```

Create a ```.env``` file with properties:
- DB_HOST  *The ip of the server with the database or localhost*
- DB_USER  *Name of the database user*
- DB_NAME  *Name of the database*
- DB_PASS  *Password for the database user*

Optionally for https support:
- HTTPS  *True/false*
- SSL_KEY  *Absolute path to the ssl key*
- SSL_CERT  *Absolute path to the ssl cert*

To start the backend -> ```gulp start```
Connect to either http://localhost:8000 or https://localhost:3000


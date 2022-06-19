const express = require('express');
const path = require('path');
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view options", {layout: false});
app.set('view engine', 'html');
app.engine('html', function (path, opt, fn) {
    fs.readFile(path, 'utf-8', function (error, str) {
        if (error) return str;
        return fn(null, str);
    });
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (err, req, res, next) {
  console.error(err);
});

module.exports = app;

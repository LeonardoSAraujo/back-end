const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors');
const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');

const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/students', studentsRouter);

module.exports = app;
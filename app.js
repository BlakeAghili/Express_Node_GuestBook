var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

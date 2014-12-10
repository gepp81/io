var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var orm = require('orm');
var settings = require('./config/settings.js');

var routes = require('./routes/index');
var dependency = require('./routes/dependency');
var io = require('./routes/io');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(orm.express(settings.database, {
  define: function (db, models, next) {
    var listModels = require('./models/');
    listModels(db, models);

    next();
  }
}));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/dependency', dependency);
app.use('/io', io);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.accepts('html')) {
    res.render('error', {
      url: req.url
    });
    return;
  }  
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
var express = require('express'),
  routes = require('./routes'),
  orm = require('orm'),
  settings = require('./config/settings.js');


var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(orm.express(settings.database, {
    define: function (db, models, next) {
      var listModels = require('./models/');
      listModels(db, models);

      next();
    }
  }));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Manejo de error 404

app.use(function (req, res, next) {
  res.status(404);
  if (req.accepts('html')) {
    res.render('error', {
      url: req.url
    });
    return;
  }
});

// Rutas

app.get('/', routes.index);

app.get('/about', function (req, res) {
  res.render('about');
});

/*app.get('/config', function (req, res) {
  res.render('config');
});*/
//app.get('/config', routes.config);
//app.post('/configSave', routes.configSave);

/* Depencencias */

app.get('/dependency/:model', routes.dependency);
app.post('/dependency', routes.dependency);
app.get('/dependencyNew/:model', routes.dependencyNew);
app.post('/dependencySave', routes.dependencySave);
app.get('/dependencyEdit/:id/:model', routes.dependencyEdit);
app.post('/dependencyUpdate', routes.dependencyUpdate);

/* IO */
app.get('/io', routes.io);

app.listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
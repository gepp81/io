var express = require('express'),
  routes = require('./routes'),
  orm = require('orm');

var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(orm.express("postgres://gpidote:gpi123@localhost/huesos", {
    define: function (db, models, next) {
      models.State = db.define("provincia", {
        id: 'integer',
        name: String
      });
      models.Sepulture = db.define("sepultura", {
        id: 'integer',
        name: String
      });
      models.Acronym = db.define("acronimo", {
        id: 'integer',
        name: String
      });
      models.Asocied = db.define("asociado", {
        id: 'integer',
        name: String
      });
      models.Conservation = db.define("conservacion", {
        id: 'integer',
        name: String
      });
      models.Dating = db.define("datacion", {
        id: 'integer',
        name: String
      });
      models.Age = db.define("edad", {
        id: 'integer',
        name: String
      });

      models.Incoming = db.define("ingreso", {
        id: 'integer',
        name: String
      });

      models.Integrity = db.define("integridad", {
        id: 'integer',
        name: String
      });

      models.Location = db.define("locacion", {
        id: 'integer',
        name: String
      });

      models.OtherRest = db.define("otroresto", {
        id: 'integer',
        name: String
      });

      models.Preservation = db.define("preservacion", {
        id: 'integer',
        name: String
      });

      models.Accuracy = db.define("precision", {
        id: 'integer',
        name: String
      });

      models.Sex = db.define("sexo", {
        id: 'integer',
        name: String
      });

      models.Site = db.define("sitio", {
        id: 'integer',
        name: String
      });

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

app.get('/config', function (req, res) {
  res.render('config');
});

app.get('/dependency/:model', routes.dependency);
app.post('/dependency', routes.dependency);
app.get('/dependencyNew/:model', routes.dependencyNew);
app.post('/dependencySave', routes.dependencySave);
app.get('/dependencyEdit/:id/:model', routes.dependencyEdit);
app.post('/dependencyUpdate', routes.dependencyUpdate);


app.listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
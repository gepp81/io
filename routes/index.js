var texts = require('../lib/labels.js');
texts = texts.labels;

exports.index = function (req, res) {
  res.render('index', {
    title: 'Inventario Oseo'
  });
};

exports.dependency = function (req, res) {

  var buscar = '%%',
    model;

  if (req.body.name != undefined) {
    buscar = '%' + req.body.name.toLowerCase() + '%';
  }

  if (req.params.model != undefined) {
    model = req.params.model;
  } else if (req.body.model != undefined) {
    model = req.body.model;
  }

  req.models[model].find().where("LOWER(name) LIKE ?", [buscar],
    function (err, result) {
      res.render('dependency/list', {
        states: result,
        model: model,
        labels: texts[model]
      });
    });
};

exports.dependencyEdit = function (req, res) {

  var model = req.params.model;

  req.models[model].get(req.params.id, function (err, result) {
    res.render('dependency/edit', {
      state: result,
      model: model,
      labels: texts[model]
    });
  });
};

exports.dependencyUpdate = function (req, res) {

  var model = req.body.model;

  req.models[model].get(req.body.id, function (err, result) {
    result.name = req.body.name;
    result.save(function (err) {
      res.redirect('/dependency/' + model);
    });
  });
};

exports.dependencyNew = function (req, res) {
  var model = req.params.model;
  res.render('dependency/new', {
    model: model,
    labels: texts[model]
  });
};

exports.dependencySave = function (req, res) {

  var newRecord = {
    name: req.body.name
  };

  var model = req.body.model;

  req.models[model].create(newRecord, function (err, results) {
    res.redirect('/dependency/' + model);
  });
};
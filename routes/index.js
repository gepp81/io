var texts = require('../config/labels.js');


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

  req.models[model].find().where("LOWER(name) LIKE ?", [buscar]).order('name').run(
    function (err, result) {
      res.render('dependency/list', {
        states: result,
        model: model,
        labels: texts.labels[model]
      });
    });
};

exports.dependencyEdit = function (req, res) {

  var model = req.params.model;

  req.models[model].get(req.params.id, function (err, result) {
    res.render('dependency/edit', {
      state: result,
      model: model,
      labels: texts.labels[model]
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
    labels: texts.labels[model]
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

exports.io = function (req, res) {

  req.models.IO.find({},['id'], (
    function (err, result) {
      res.render('io/list', {
        states: result
      });
    }));
};

/*exports.config = function (req, res) {
  var settings = require('../config/settings.js');
  res.render('config', {
    settings: settings
  });
};

/*exports.configSave = function (req, res) {
  var fs = require('fs');
  console.log("The ");
  fs.writeFile("config/settings2.js", "Hey there!", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
//};**/
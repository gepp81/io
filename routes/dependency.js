var express = require('express');
var router = express.Router();
var texts = require('../config/labels.js');


router.get('/:model', function (req, res) {
  var model;
console.log('pidotes');
  if (req.params.model != undefined) {
    model = req.params.model;
  }

  req.models[model].find({}).order('name').run(
    function (err, result) {
      res.render('dependency/list', {
        states: result,
        model: model,
        labels: texts.labels[model]
      });
    });
});

router.post('/search', function (req, res) {
  console.log('pidote');
  var buscar = '%%',
    model;

  if (req.body.name != undefined) {
    buscar = '%' + req.body.name.toLowerCase() + '%';
  }

  model = req.body.model;

  req.models[model].find().where("LOWER(name) LIKE ?", [buscar]).order('name').run(
    function (err, result) {
      res.render('dependency/list', {
        states: result,
        model: model,
        labels: texts.labels[model]
      });
    });
});

router.get('/edit/:model/:id', function (req, res) {

  var model = req.params.model;

  req.models[model].get(req.params.id, function (err, result) {
    res.render('dependency/edit', {
      state: result,
      model: model,
      labels: texts.labels[model]
    });
  });
});

router.post('/update', function (req, res) {
  var model = req.body.model;

  req.models[model].get(req.body.id, function (err, result) {
    result.name = req.body.name;
    result.save(function (err) {
      res.redirect('/dependency/' + model);
    });
  });
});

router.get('/new/:model', function (req, res) {
  var model = req.params.model;

  res.render('dependency/new', {
    model: model,
    labels: texts.labels[model]
  });
});

router.post('/save', function (req, res) {
  var newRecord = {
    name: req.body.name
  };

  var model = req.body.model;

  req.models[model].create(newRecord, function (err, results) {
    res.redirect('/dependency/' + model);
  });
});

module.exports = router;
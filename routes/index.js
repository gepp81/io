exports.index = function (req, res) {
  res.render('index', {
    title: 'Inventario Oseo'
  });
};

exports.state = function (req, res) {

  var buscar = '%%';

  if (req.body.name != undefined) {
    buscar = '%' + req.body.name.toLowerCase() + '%';
  }

  req.models.State.find().where("LOWER(name) LIKE ?", [buscar],
    function (err, result) {
      res.render('state/list', {
        states: result
      });
    });
};

exports.stateEdit = function (req, res) {

  req.models.State.get(req.params.id, function (err, result) {
    res.render('state/edit', {
      state: result
    });
  });
};

exports.stateUpdate = function (req, res) {

  req.models.State.get(req.body.id, function (err, result) {
    result.name = req.body.name;
    result.save(function (err) {
      res.redirect('/state');
    });
  });
};

exports.stateNew = function (req, res) {
  res.render('state/new');
};

exports.stateSave = function (req, res) {

  var newRecord = {
    name: req.body.name
  };

  req.models.State.create(newRecord, function (err, results) {
    res.redirect('/state');
  });
};
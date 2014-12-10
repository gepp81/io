var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

  req.models.IO.find({}, ['id'], (
    function (err, result) {
      res.render('io/list', {
        states: result
      });
    }));
});

module.exports = router;
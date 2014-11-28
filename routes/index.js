exports.index = function (req, res) {
    res.render('index', {
        title: 'Express'
    });
};

exports.state = function (req, res) {

    var orm = require("orm");

    orm.connect("postgres://gpidote:gpi123@localhost/huesos", function (err, db) {
        if (err) throw err;

        var State = db.define("provincia", {
            id: 'integer',
            name: String
        });

        State.find({}, function (err, result) {
            res.render('state/list', {
                states: result
            });
        });


    })
};

exports.stateEdit = function (req, res) {

    var orm = require("orm");

    orm.connect("postgres://gpidote:gpi123@localhost/huesos", function (err, db) {
        if (err) throw err;

        var State = db.define("provincia", {
            id: 'integer',
            name: String
        });

        State.get(req.params.id, function (err, result) {
            res.render('state/edit', {
                state: result
            });

        });


    })
};

exports.stateUpdate = function (req, res) {

    var orm = require("orm");
    console.log("A");
    orm.connect("postgres://gpidote:gpi123@localhost/huesos", function (err, db) {
        if (err) throw err;

        var State = db.define("provincia", {
            id: 'integer',
            name: String
        });

        State.get(req.body.id, function (err, result) {
            console.log(result);
            result.name = req.body.name;
            result.save(function (err) {
                res.redirect('/state');
            });
        });

    })
};
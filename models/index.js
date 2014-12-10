module.exports = function (db, models) {

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

  models.Location = db.define("localidad", {
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

  models.IO = db.define("io", {
    id: 'integer',
    ficharesumen: String,
    sitio: String,
    nroregistro: String
  });
}
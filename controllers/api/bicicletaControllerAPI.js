var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
  Bicicleta.allBikes()
    .then(bicis => {
      res.status(200).json({ bicicletas: bicis });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.bicicleta_create = function(req, res) {
  const bici = Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo, [req.body.lat, req.body.lng]);
  Bicicleta.add(bici)
    .then(newBici => {
      res.status(200).json({ bicicleta: newBici });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.bicicleta_delete = function(req, res) {
  Bicicleta.removeByCode(req.body.code)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: err.message }));
};
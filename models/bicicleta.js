const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number],
    index: { type: '2dsphere', sparse: true }
  }
});

// Método de instancia para crear la estructura
bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
  return new this({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  });
};

// Métodos estáticos requeridos por las pruebas
bicicletaSchema.statics.allBikes = function() {
  return this.find({});
};

bicicletaSchema.statics.add = function(aBici) {
  return this.create(aBici);
};

bicicletaSchema.statics.findByCode = function(aCode) {
  return this.findOne({ code: aCode });
};

bicicletaSchema.statics.removeByCode = function(aCode) {
  return this.deleteOne({ code: aCode });
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
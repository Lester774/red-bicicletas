const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas Model con Mongoose', function() {

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeAll(function(done) {
    const mongoDB = 'mongodb://127.0.0.1:27017/red_bicicletas';
    mongoose.connect(mongoDB);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
      console.log('Conectado a la base de datos de pruebas!');
      done();
    });
  });

  afterEach(function(done) {
    Bicicleta.deleteMany({})
      .then(() => done())
      .catch(err => {
        console.error(err);
        done();
      });
  });

  afterAll(function(done) {
    mongoose.disconnect()
      .then(() => done())
      .catch(err => {
        console.error(err);
        done();
      });
  });

  describe('Bicicleta.createInstance', () => {
    it('crea una instancia de Bicicleta', () => {
      const bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.6012, -58.3836]);
      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-34.6012);
      expect(bici.ubicacion[1]).toEqual(-58.3836);
    });
  });

  describe('Bicicleta.allBikes', () => {
    it('comienza vacia', (done) => {
      Bicicleta.allBikes()
        .then(bicis => {
          expect(bicis.length).toBe(0);
          done();
        })
        .catch(err => done.fail(err));
    });
  });

  describe('Bicicleta.add', () => {
    it('agrega una bicicleta a la base de datos', (done) => {
      const aBici = Bicicleta.createInstance(1, "rojo", "urbana", [-34.6012, -58.3836]);
      Bicicleta.add(aBici)
        .then(() => Bicicleta.allBikes())
        .then(bicis => {
          expect(bicis.length).toBe(1);
          expect(bicis[0].code).toBe(aBici.code);
          done();
        })
        .catch(err => done.fail(err));
    });
  });

  describe('Bicicleta.findByCode', () => {
    it('debe devolver la bicicleta con el code correspondiente', (done) => {
      const aBici = Bicicleta.createInstance(1, "verde", "urbana", [-34.6012, -58.3836]);
      const aBici2 = Bicicleta.createInstance(2, "rojo", "montaña", [-34.6012, -58.3836]);

      Promise.all([Bicicleta.add(aBici), Bicicleta.add(aBici2)])
        .then(() => Bicicleta.findByCode(1))
        .then(targetBici => {
          expect(targetBici.code).toBe(aBici.code);
          expect(targetBici.color).toBe(aBici.color);
          expect(targetBici.modelo).toBe(aBici.modelo);
          done();
        })
        .catch(err => done.fail(err));
    });
  });

  describe('Bicicleta.removeByCode', () => {
    it('debe eliminar la bicicleta con el code correspondiente', (done) => {
      const aBici = Bicicleta.createInstance(1, "verde", "urbana", [-34.6012, -58.3836]);
      
      Bicicleta.add(aBici)
        .then(() => Bicicleta.allBikes())
        .then(bicis => {
          expect(bicis.length).toBe(1);
          return Bicicleta.removeByCode(1);
        })
        .then(() => Bicicleta.allBikes())
        .then(bicis => {
          expect(bicis.length).toBe(0);
          done();
        })
        .catch(err => done.fail(err));
    });
  });

});
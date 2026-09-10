const mongoose = require('mongoose');
const Bicicleta = require('../models/bicicleta');
const request = require('request');
const server = require('../bin/www');

const URL_BASE = 'http://localhost:3000/api/bicicletas';

describe('Bicicleta API', () => {

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeAll((done) => {
    const mongoDB = 'mongodb://127.0.0.1:27017/red_bicicletas';
    mongoose.connect(mongoDB);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Conectado a la base de datos de pruebas para API!');
      done();
    });
  });

  afterEach((done) => {
    Bicicleta.deleteMany({})
      .then(() => done())
      .catch(err => {
        console.error(err);
        done();
      });
  });

  afterAll((done) => {
    mongoose.disconnect()
      .then(() => done())
      .catch(err => {
        console.error(err);
        done();
      });
  });

  describe('GET /api/bicicletas', () => {
    it('Responde con status 200 y una lista vacía de bicicletas', (done) => {
      request.get(URL_BASE, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        const result = JSON.parse(body);
        expect(result.bicicletas.length).toBe(0);
        done();
      });
    });
  });

  describe('POST /api/bicicletas/create', () => {
    it('Crea una nueva bicicleta correctamente', (done) => {
      const headers = { 'content-type': 'application/json' };
      const aBici = JSON.stringify({
     code: 10,
     color: 'rojo',
     modelo: 'urbana',
     lat: -34.6012,
     lng: -58.3836
      });

      request.post({
        headers: headers,
        url: URL_BASE + '/create',
        body: aBici
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        Bicicleta.findByCode(10).then(targetBici => {
          expect(targetBici.color).toBe('rojo');
          expect(targetBici.modelo).toBe('urbana');
          done();
        });
      });
    });
  });

});
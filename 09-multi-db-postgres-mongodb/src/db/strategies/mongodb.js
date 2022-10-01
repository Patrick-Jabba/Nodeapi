const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');


class MongoDB extends ICrud {
  constructor() {
    super();
  }

  isConnected() {

  }

  defineModel() {

  }

  connect() {
    Mongoose.connect('mongodb://patrick:minhasenhasecreta@localhost:27017/herois', {
      useNewUrlParser: true
    }, function (error) {
      if (!error) return;
      console.log('Falha na conexão: ', error);
    });
  }

  create(item) {
    console.log('O item foi salvo em MongoDB');
  }
}

module.exports = MongoDB;
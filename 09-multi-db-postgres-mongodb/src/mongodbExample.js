const Mongoose = require('mongoose');

Mongoose.connect('mongodb://patrick:minhasenhasecreta@localhost:27017/herois', {
  useNewUrlParser: true
}, function (error) {
  if (!error) return;
  console.log('Falha na conexão: ', error);
})

// function nomedaFuncao() {}
// const minhaFuncao = function () {}
// const minhaFuncaoArrow = () => {}
// const minhaFuncaoArrowFs = (params) => console.log(params);


const connection = Mongoose.connection;

connection.once('open', () => console.log('database rodando!!'))

setTimeout(() => {
  const state = connection.readyState;
  console.log('state', state)
}, 1000)

/*
  0: Disconectado
  1: Conectado
  2: Conectando
  3: Disconetando
*/

const heroiSchema = new Mongoose
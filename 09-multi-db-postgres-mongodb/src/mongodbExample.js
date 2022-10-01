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

const heroiSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  poder: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  }
})

const model = Mongoose.model('heroi', heroiSchema);

async function main () {
  const resultCadastrar = await model.create({
    nome: 'Aquaman',
    poder: 'Falar com animais',
  })
  console.log('result cadastrar', resultCadastrar)

  const listItems = await model.find();
  console.log('item', listItems)
}

main()

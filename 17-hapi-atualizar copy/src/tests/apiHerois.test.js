const assert = require('assert');
const api = require('../api');

let app = {};

const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Biônica'
}

describe(' 🦸‍♂️ Suite de testes da API Herois', function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it('listar /herois - deve retornar somente 3 registros', async () => {
    const TAMANHO_LIMITE = 3;
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEW';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    });

    const errorResult = {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "\"limit\" must be a number",
      "validation": {
        "source": "query",
        "keys": ["limit"]
      }
    }

    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult))
  });

  it('cadastrar POST -  /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!")

  })

});
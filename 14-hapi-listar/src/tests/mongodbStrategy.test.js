const assert = require('assert');
const MongoDb = require('../db/strategies/mongodb/mongodb');
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroiSchema');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laço'
}
const MOCK_HEROI_DEFAULT = {
  nome: `Homem Aranha-${Date.now()}`,
  poder: 'Super Teia'
}

const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  poder: 'Cuspidela'
}

let MOCK_HEROI_ID = '';

let context = {};

describe('🧪🍃MongoDB Suíte de Testes', function () {
  this.beforeAll(async () => {
    const connection = MongoDb.connect();
    context = new Context(new MongoDb(connection, HeroiSchema));

    await context.create(MOCK_HEROI_DEFAULT);
    await context.create(MOCK_HEROI_ATUALIZAR);
    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ID = result._id;
  });

  it('Verificar conexão', async () => {
    const result = await context.isConnected();
    const expected = 'Conectado';

    assert.deepEqual(result, expected);
  });

  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it('listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome });
    const result = {
      nome, poder
    }

    assert.deepEqual(result, MOCK_HEROI_DEFAULT);
  });

  it('atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Pernalonga'
    });

    assert.deepEqual(result.modifiedCount, 1)
  });

  it('remover', async () => {
    const result = await context.delete(MOCK_HEROI_ID);

    assert.deepEqual(result.deletedCount, 1);
  })
})

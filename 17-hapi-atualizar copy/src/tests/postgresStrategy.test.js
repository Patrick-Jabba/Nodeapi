const assert = require('assert');
const Postgres = require('../db/strategies/postgres/postgres');
const HeroisSchema = require('../db/strategies/postgres/schemas/heroisSchema');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
  nome: 'Gavião Negro',
  poder: 'flechas',
}
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Batman',
  poder: 'Dinheiro',
}

let context = {};

describe('🧪🐘Postgres Suite de Testes', function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroisSchema);
    context = new Context(new Postgres(connection, model));
    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it('PostgresSQL Connection', async function () {
    const result = await context.isConnected();
    assert.equal(result, true)
  });

  it("Cadastrar", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    console.log('result', result);
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Listar", async function () {
    const [result] = await context.read({
      nome: MOCK_HEROI_CADASTRAR.nome
    });
    delete result.id;
    //pegar a primeira posicao
    //const posicaoZero = result[0]
    // const [posicao1, posicao2] = ['esse e o 1', 'esse e o 2']

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('atualizar', async function () {
    const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha'
    }
    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await context.read({id: itemAtualizar.id})
    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    // SEM REST/SPREAD operator => novoItem.MOCK_HEROI_ATUALIZAR

    /*
    No javascript temos uma tecnica chamada rest/spread que é um metodo para mergear objetos ou separa-los
    {
      nome: 'Batman',
      poder: 'Dinheiro',
    }
    
    {
      dataNascimento: '1998-01-01'
    }
    
    // final
      nome: 'Batman',
      poder: 'Dinheiro',
      dataNascimento: '1998-01-01'
    */
  });

  it('remover por id', async function(){
    const [item] = await context.read({});
    const result = await context.delete(item.id);

    assert.deepEqual(result, 1);
  })
})

const {
  readFile, writeFile
} = require('fs');

const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

//outra forma de obter dados do json
// const dadosJson = require('./herois.json');

class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json';
  }
  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
    return JSON.parse(arquivo.toString())
  }

  async escreverArquivo(data) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data));
    return true;
  }

  async cadastrar(heroi) {
    const data = await this.obterDadosArquivo();
    const id = heroi.id <= 2 ? heroi.id : Date.now();

    const heroiComId = {
      id,
      ...heroi
    }
    const dadosFinal = [
      ...data,
      heroiComId
    ]
    const resultado = await this.escreverArquivo(dadosFinal);
    return resultado;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    const dadosFiltrados = dados.filter(item => (id ? item.id === id : true));
    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return this.escreverArquivo([]);
    }

    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex((item) => item.id === parseInt(id));
    if (indice === -1) {
      throw Error('O herói informado não existe!');
    }

    dados.splice(indice, 1);
    return this.escreverArquivo(dados);
  }

  async atualizar(id, body) {
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex(item => item.id === parseInt(id));

    if (indice === -1) { throw Error('herói informado não existe!') }

    const actual = dados[indice];
    const objetoAtualizar = {
      ...actual,
      ...body
    }
    dados.splice(indice, 1);

    return this.escreverArquivo([
      ...dados,
      objetoAtualizar
    ]);

  }


}

module.exports = new Database();
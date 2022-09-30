const {Command} = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
  const program = new Command();
  program
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do Heroi")

    .option('-c, --cadastrar', "Cadastrar um Heroi")
    .option('-l, --listar', "Listar um Heroi")
    .option('-r, --remover [value]', "Remover um Heroi pelo id")
    .option('-a, --atualizar [value]', "Atualizar um Heroi pelo id")
    program.parse(process.argv)

    const options = program.opts();
    const heroi = new Heroi(options);

  try {
    if (options.cadastrar) {
      delete heroi.id
      const resultado = await Database.cadastrar(heroi);
      if(!resultado) {
        console.error('Heroi não foi cadastrado');
        return;
      }
      console.log('Heroi cadastrado com sucesso!')
    }

    if(options.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
      return;
    }

    if(options.remover){
      const resultado = await Database.remover(heroi.id);
      if(!resultado) {
        console.error('Não foi possível remover o heroi')
        return;
      }
      console.log('Heroi removido com sucesso!');
    }

    if (options.atualizar){
      const idParaAtualizar = parseInt(options.atualizar);
      delete heroi.id;
      //remover todas as chaves que estiverem com undefined ou null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
      if(!resultado){
        console.error('DEU RUIM')
        return;
      }
      console.log('Heroi atualizado com sucesso!')
    }
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();
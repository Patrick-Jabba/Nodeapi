const { getPeople } = require('./service');

Array.prototype.meuFilter = function (callback){
  const lista = []
  for(index in this){
    const item = this[index];
    const result = callback(item, index, this)

    if(!result) continue;
    lista.push(item);
  }

  return lista;
}

async function main() {
  try{
    const {results} = await getPeople(`a`)
    
    // const clan = results.filter(item => {
    //   // por padrão precisa retornar um booleano para informar se deve manter ou remover da lista, false ->  remove da lista, true => mantem, naõ encontrou -1, encontrou = posiçãoNoArray

    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    //   return result;
    // })

    const clan = results.meuFilter(item => {

      return item.name.toLowerCase().indexOf('lars') !== -1;
      
    })
    
    const names = clan.map(personagem => personagem.name);
    console.log(names);
  }
  catch(error){
    console.log(error);
  }

}

main()
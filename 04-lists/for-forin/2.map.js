const service = require('./service');

Array.prototype.meuMap = function(callback){
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++){
    const resultado = callback(this[indice], indice)
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado
}

async function main() {
  try {
    const results = await service.getPeople(`a`)
    

    // results.results.forEach(character => {
    //     names.push(character.name)
    // });
    // const names = results.results.map(character => character.name);

    const names = results.results.meuMap((character, indice) => {
      return `[${indice} ${character.name}]`;
    })


    console.log(names)
  }
  catch(error){
    console.log(error);
  }
}

main()
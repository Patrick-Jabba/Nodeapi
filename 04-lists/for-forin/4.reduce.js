const { getPeople } = require('./service');

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
}


async function main() {
  try {
    const { results } = await getPeople('a');

    const alturas = results.map(item => parseInt(item.height));
    console.log('alturas', alturas)

    // const total = alturas.reduce((anterior, proximo) => {
    //   return anterior + proximo;
    // });

    const minhaLista = [
      ['Patrick', 'monteiro'],
      ['JStack', 'NodeBR' ]
    ]

    const totalString = minhaLista.meuReduce((anterior, proximo) => {
      return anterior.concat(proximo)
    }, [])
    .join(', ')
    console.log('totalString', totalString);

    const total = alturas.meuReduce((anterior, proximo) => {
      return anterior + proximo;
    }, 0)

    console.log(total);
  }
  catch (error) {
    console.log('DEU RUIM', error);
  }
}

main();
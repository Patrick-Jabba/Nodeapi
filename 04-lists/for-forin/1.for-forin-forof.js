const service = require('./service');

async function main() {
  try {
    const result = await service.getPeople('a')
    const names = []
    console.time('for');
    for(let i = 0; i <= result.results.length - 1; i++ ){
      const character = result.results[i];
      names.push(character.name)
    }
    console.timeEnd('for')

    console.time('forin');
    for (let i in result.results) {
      const character = result.results[i];
      names.push(character.name);
    }
    console.timeEnd('forin')

    console.time('forof');
    for (const character of result.results) {
      names.push(character.name)
      
    }
     console.timeEnd('forof')
    console.log(`names`, names)


  }
  catch (error) {
    console.log('error interno', error)
  }
}

main();
/*
Obter um usuário
Preciso obter o número de telefone de um usuário a partir de seu Id
Obter o endereço do usuario pelo Id
*/

//importamos um módulo interno do node.js
const util = require('util');
const getAdressAsync = util.promisify(getAdress)


function getUser() {
  //Quando der algum problema -> reject(ERRO)
  //Quando sucesso -> RESOLVE
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject (new Error('deu RUIM DE VERDADE!'));

      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function getPhone(userId) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        phone: '9999',
        ddd: 21,
      })
    }, 1000)
  })
}

function getAdress(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Rua dos Bobos',
      numero: 0,
    })
  }, 2000)

}

// 1o passo adicionar a palavra async na funão -> automaticamente ela retornará uma promise
main();
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await getUser();
    // const telefone = await getPhone(usuario.id);
    // const endereco = await getAdressAsync(usuario.id);
    const resultado = await Promise.all([
      getPhone(usuario.id),
      getAdressAsync(usuario.id)
    ])

    const telefone = resultado[0]
    const endereco = resultado[1]
    console.log(`
    Nome: ${usuario.nome},
    Telefone: ${telefone.ddd} ${telefone.phone},
    Endereço: ${endereco.rua} ${endereco.numero}`)
    console.timeEnd('medida-promise')
  }
  catch (error) {
    console.error('DEU RUIM', error)
  }
}

// const usuarioPromise = getUser();
// //para manipular o sucesso usamos .then e para erros usamos o .catch
// // usuario -> telefone -> telefone

// usuarioPromise
//   .then(function (usuario) {
//     return getPhone(usuario.id)
//     .then(function resolvePhone(result){
//       return{
//         usuario: {
//           id : usuario.id,
//           nome: usuario.nome,

//         },
//         telefone: result
//       }
//     })
//   })
//   .then(function (resultado){
//     const endereco = getAdressAsync(resultado.usuario.id)
//     return endereco.then(function resolveAdress(result){
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//     Nome: ${resultado.usuario.nome},
//     Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//     Telefone: ${resultado.telefone.ddd} ${resultado.telefone.phone}
//     `)

//   })
//   .catch(function (error) {
//     console.log('deu ruim', error)
//   })



// getUser(function userResolution(error, usuario) {
//   //no JS null || "" || 0 === false
//   if (error) {
//     console.error('DEU RUIM EM USUARIO', error)
//     return;
//   }

//   getPhone(usuario.id, function phoneResolution(error1, phone) {
//     if (error) {
//       console.error('DEU RUIM EM TELEFONE', error)
//       return;
//     }

//     getAdress(usuario.id, function adressResolution(error2, endereco) {
//       if (error2) {
//         console.error('Deu ruim em telefone', error);
//         return;
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereço: ${endereco.rua}, ${endereco.numero},
//         Telefone: ${phone.ddd} ${phone.phone}`)
//     })
//   })
// });

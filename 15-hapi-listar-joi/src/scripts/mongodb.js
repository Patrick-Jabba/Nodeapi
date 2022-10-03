// docker ps
// docker exec -it mongodb mongo -u admin -p senhaadmin --authenticationDatabase herois
// docker exec -it mongodb mongo -u patrick -p minhasenhasecreta --authenticationDatabase herois

// databases
show dbs

// mudando o contexto para uma database
use herois

// mostrando as tabelas(coleções de documentos)
show collections

db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for (let i=0; i <=10000; i++){
  db.herois.insert({
    nome: `Clone${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
  })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})
db.herois.find({nome: 'Mulher Maravilha'})
db.herois.find({_id: ObjectId('63386143605aa52e4492f328')})

//create
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998-01-01'
})

//read 
db.herois.find()

//update
db.herois.update({ _id: ObjectId("63386052605aa52e4492ef40")},
{nome: 'Mulher Maravilha'})

db.herois.update({ _id: ObjectId("63386143605aa52e4492f328")},
                { $set: {nome: 'Lanterna Verde'}})

db.herois.update({ poder: 'Velocidade'},
                { $set: {poder: 'Super Força'}})

// delete
db.herois.remove({nome: 'Mulher Maravilha'})


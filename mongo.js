/* eslint-disable no-undef */
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/
const mongoose = require('mongoose')

if(process.argv.length < 3) {
  showMessage()
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://ralo:${password}@cluster0-ufcyk.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person',personSchema)

switch (process.argv.length) {
case 3: {
  Person.find({}).then( result => {
    result.forEach( person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
  break
}
case 5: { 
  const person = new Person({
    'name': personName,
    'number': personNumber
  })
  person.save().then ( result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
  break
}
default: { 
  showMessage()
  process.exit(1)
}
}

function showMessage(){
  console.log('To list the phonebook try: node mongo.js <password>')
  console.log('To add a new person try: node mongo.js <password> + <name> + <number>')
}
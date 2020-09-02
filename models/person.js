const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

console.log('Trying to connect to: ',url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ',error.message)
  })

const personSchema = new mongoose.Schema({
  name: { 
    type:String,
    required: true,
    unique:true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    required:true
  },
})

personSchema.set('toJSON',{
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Apply the uniqueValidator plugin to personSchema.
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person',personSchema)
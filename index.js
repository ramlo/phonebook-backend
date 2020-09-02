require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('postData', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData ', {
  skip: function (req, res) { return req.method !== 'POST' }
})
)

let persons =
    [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]

const generateId = () => {
  return Math.floor(Math.random() * (999999999 - 1) + 1)
}

const numberExists = (persons, number) => {
  return persons.find(person => {
    return person.number === number
  })
}

app.get('/info', (req, res,next) => {
  Person.countDocuments({},(err, total) => {
    if(err){
      next(err)
    }else{
      res.send(`Phone has info for ${total} people <br> 
            ${new Date()}`)
    }
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).
    then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

//The name or number is missing
//The name already exists in the phonebook
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({
      error: 'name and number can\'t be empty'
    })
  }else if (numberExists(persons, body.number)) {
    res.status(400).json({
      error: 'number already exists'
    })
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(personSaved =>{
      res.json(personSaved)
    })
      .catch(err => next(err))
  }
})

app.put('/api/persons/:id', (req,res,next)=>{
  const body = req.body

  const person = {
    number: body.number
  }
  let opts={new:true, runValidators: true }
  Person.findByIdAndUpdate(req.params.id,person,opts)
    .then(updatedPerson =>{
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name ==='ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`App listen on PORT: ${PORT}`)
})
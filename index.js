const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

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

app.get('/info', (req, res) => {
    res.send(`Phone has info for ${persons.length} people <br> 
    ${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(person => {
        return person.id === id
    })

    if (person) {
        res.send(person)
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const counter = persons.length

    persons = persons.filter(person => {
        return person.id !== id
    })
    if (counter === persons.length || !counter) {
        res.status(404).end()
    } else {
        res.status(204).end()
    }
})

//The name or number is missing
//The name already exists in the phonebook
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({
            error: 'name and number can\'t be empty'
        });
    } else if (numberExists(persons, body.number)) {
        res.status(400).json({
            error: 'number already exists'
        });
    } else {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
        }
        persons = persons.concat(person)
        res.status(201).send(person)
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App listen on PORT: ${PORT}`)
})
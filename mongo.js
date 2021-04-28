const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(name, ", ", number)

const url =
  `mongodb+srv://user1:${password}@cluster0.islcz.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if ( !name || !number) {
   console.log('phonebook:')
   Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person.name, " ", person.number)
      })
      mongoose.connection.close()
    })
} else {
   // console.log('entered route 2')
   const person = new Person({
      name: name,
      number: number
   })

   person.save().then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
}

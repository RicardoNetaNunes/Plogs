// SEEDING IS TO ENSURE OUR DB HAS SOME INITIAL DATA

// 1. MAKE THE DB CONNECTIONS
require('../db')
const mongoose = require('mongoose')

// 2. REQUIRE THE MODEL
let Places = require('../models/Places.model')

// 3. INSERT DATA IN THE MODEL
Places.insertMany([
    {Name:'Praia Adão e Eva', Location:'Monte Gordo'},
    {Name:'Praia do Coral', Location: 'Viana do Castelo'}
])
    .then(() => {
        console.log('Data inserted')
        mongoose.connection.close()
    })
    .catch((err) => {
        console.log('Error ', err)
        mongoose.connection.close()
    })



// 4. Close the connection
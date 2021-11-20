// SEEDING IS TO ENSURE OUR DB HAS SOME INITIAL DATA

// 1. MAKE THE DB CONNECTIONS
require('../db')
const mongoose = require('mongoose')

// 2. REQUIRE THE MODEL
let Places = require('../models/Places.model')

// 3. INSERT DATA IN THE MODEL
Places.insertMany([
    {name:'Praia Adão e Eva', location:'Monte Gordo'},
    {name:'Praia do Coral', location: 'Viana do Castelo'}
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
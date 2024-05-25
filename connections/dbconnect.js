
require('dotenv').config()
const mongoose = require('mongoose');
const configSetter = require('../utilities/config.json');
const mongodbConnection = require('../connections/db');
const generateMongoDBURI = mongodbConnection[configSetter.dbconnections]['cString'] || process.env.DATABASE;

async function connection() {
    await mongoose.connect(generateMongoDBURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            minPoolSize: 6,
            maxPoolSize: 14
        })
}

async function closeDb() {
    await mongoose.connection.close();
}

module.exports = {
    connection: () => {
        connection()
    },
    closeDb: () => {
        setTimeout(() => closeDb(), 5000)
    }
}



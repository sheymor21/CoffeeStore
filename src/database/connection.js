const mongoose = require('mongoose');
require('dotenv').config();

const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;
const DBNAME = process.env.MONGO_DBNAME;
const URI = process.env.MONGO_URI;

mongoose.connect(URI, {user: USER, pass: PASS, dbName: DBNAME})
    .then(async () => {
        console.log('MongoDB Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;

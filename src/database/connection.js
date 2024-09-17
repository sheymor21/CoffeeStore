const mongoose = require('mongoose');

const USER = 'root'
const PASS = 'password!1'
const DBNAME = 'prueba'
const URI = 'mongodb://127.0.0.1:27017';

mongoose.connect(URI, {user: USER, pass: PASS, dbName: DBNAME})
    .then(async () => {
        console.log('MongoDB Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;

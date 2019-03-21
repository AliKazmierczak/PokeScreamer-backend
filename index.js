const Joi = require('joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
// const login = require('./routes/login');
const users = require('./routes/users');

if(!config.get('pokeKey')){
    console.error('FATAL ERROR! Key not defined.');
    process.exit(1);
};

mongoose.connect('mongodb://localhost/Screamer', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
// app.use('/api/login', login);
app.use('/users', users);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
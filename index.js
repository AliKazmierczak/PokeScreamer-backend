const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const login = require('./routes/login');
const user = require('./routes/user');

if(!config.get('vidlyKey')){
    console.error('FATAL ERROR! Key not defined.');
    process.exit(1);
};

mongoose.connect('mongodb://localhost/projectVidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/login', login);
app.use('/app/user', user);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
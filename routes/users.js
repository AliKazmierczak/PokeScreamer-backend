const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const lodash = require('lodash');
const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');

router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.send('Thank you - check your e-mail for validation message');

    user = new User(
        lodash.pick(req.body, ['email', 'password'])
    );
    const salt = await bcrypt.genSalt(13);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token)
        .send(user.name);
    console.log('Sending a validation e-mail to: ', req.body.email);
});

module.exports = router
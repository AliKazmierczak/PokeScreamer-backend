const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require ('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlenght: 8,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        minlenght: 8,
        maxlength: 500
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, config.get('pokeKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validate(user){
    const schema={
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().required().min(8).max(50)
    };
    return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validate;
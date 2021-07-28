const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {signUpErrors, logInErrors} = require('../utils/errors.utils');

const maxDuration = 2*24*60*60*1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxDuration
    })
}

module.exports.signUp = async(req, res) => {
    const{pseudo, email, password} = req.body

    try {
        const user = await userModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    } catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    }
}

module.exports.logIn = async(req, res) => {
    const{pseudo, password} = req.body

    try {
        const user = await userModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxDuration});
        res.status(200).json({user: user._id});
        console.log(' +++  utilisateur (' + user.pseudo + '#' + user._id + ') connecté  +++ ')
    } catch(err) {
        const errors = logInErrors (err);
        res.status(200).send({errors});
    }
}

module.exports.logOut = async(req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
    console.log(' ---  utilisateur déconnecté  --- ');
    
}
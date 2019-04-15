//Module Imports
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Load User Model
const User = require('../../models/User.js');

// - ROUTE = GET api/users/test
// - Test route for Users resource
// - PUBLIC-ACCESS
router.get('/test', (req, res) => {
    res.json({
        msg: "Successful User-Route connection"
    })
});

// - ROUTE = GET api/users/register
// - New User SignUp
// - PUBLIC-ACCESS
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({
                    email: "Email already exits"
                });
            } else {
                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });
            }
        })
});



module.exports = router;
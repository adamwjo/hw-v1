//Module Imports
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config/config.js');


//Load User Valiidations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput =  require('../../validation/login.js');

//Load User Model
const User = require('../../models/User.js');



//**************************** ROUTES *************************************************************//




// - GET api/users/test
// - Test route for Users resource
// - PUBLIC-ACCESS
router.get('/test', (req, res) => {
    res.json({
        msg: "Successful User-Route connection"
    })
});

// - GET api/users/register
// - New User SignUp
// - PUBLIC-ACCESS
router.post('/register', (req, res) => {
    // The first thing we want to do destructure the errors we want to validate against
    const { errors, isValid } = validateRegisterInput(req.body);
    //one the errors are pulled out we check them
    if(!isValid) {
       return res.status(400).json(errors) 
    }
    
    //checks to see if email already exits
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({
                    email: "Email already exits"
                });
            } else {
                //if user does not already exist new user is initialized
                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });
                //before new user is saved to database password must be salted and hashed
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                });
            }
        })
});

// - GET api/users/login
// - User Login
// - PUBLIC-ACCESS
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    //one the errors are pulled out we check them
    if(!isValid) {
       return res.status(400).json(errors) 
    }

    const email = req.body.email;
    const password = req.body.password;

    //finds user by email
    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = "User not found"
                return res.status(404).json(errors)
            }
            //if email is able to found, password is now checked
            //The compare function compared the password with the hashed password thate exits in the database.
            bcrypt.compare(password, user.password).then(isMatch => {
                    if(isMatch){
                        //if the password matches JWT token can now be signed
                        //You can define a payload you wish to pass along

                        const payload = {
                            id: user.id,
                            first_name: user.first_name
                        }

                        jwt.sign(payload, config.JWTSecret, {  expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });

                    } else {
                        errors.password = "Invalid Password"
                        return res.status(400).json(errors)
                    }
                })
        })
});

// - GET api/users/current
// - Route to obtain current user with jwt payload
// - Private-ACCESS
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        first_name: req.user.first_name,
        username: req.user.first_name,
        email: req.user.email 
    })
});




module.exports = router;
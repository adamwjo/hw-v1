const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // checks the fields to see if they are empty, 
    // if so the field is set to an empty string so "Validator" can check it
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    

    //validates the first_name for proper length
    if(!Validator.isLength(data.first_name, {min: 2, max: 30})) {
        errors.first_name = "First name must be between 2 mand 30 characters."
    }
    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = "First name field cannot be empty."
    }


    //validates last name for proper length
    if(!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
        errors.last_name = "Last name must be between 2 and 30 characters."
    }
    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last name cannot be empty"
    }


    //validates email
    if(!Validator.isEmail(data.email)) {
        errors.email = "Must submit a valid email address"
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }


    //validates password
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field cannot be empty"
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "Second password field cannot be empty"
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters"
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
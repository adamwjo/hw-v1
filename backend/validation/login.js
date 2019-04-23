const Validator = require('validator');
const isEmpty = require('./is-empty'); 


module.exports = function validateLoginInput(data) {
    let errors = {};

    // checks the fields to see if they are empty, 
    // if so the field is set to an empty string so "Validator" can check it
   
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';




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

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
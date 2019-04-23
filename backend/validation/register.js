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
        errors.name = "First name field cannot be empty."
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
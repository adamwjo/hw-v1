const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateRegisterInput(data) {
    let errors = {};
    if(!Validator.isLength(data.first_name, {min: 2, max: 30})){
        errors.first_name = "First name must be between 2 mand 30 Characters"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
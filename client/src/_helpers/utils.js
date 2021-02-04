const passwordValidator = require('password-validator');

export function validatePassword(oldPassword, newPassword){
    var schema = new passwordValidator();
    schema.has().not().spaces()
        .has().digits()
        .has().uppercase()
        .has().lowercase()
        .is().max(50)
        .is().min(8);

    let validations = schema.validate(newPassword, { list: true });
    var message = '';
    for (var i = 0; i < validations.length; i++) {
        switch(validations[i]) {
            case "digits":
                message = 'Password must have at least 1 digit'
                break;
            case "lowercase":
                message = 'Password must have at least 1 lowercase character'
                break;
            case "uppercase":
                message = 'Password must have at least 1 uppercase character'
                break;
            case 'min':
                message = 'Password must be at least 8 characters'
                break;
            case "max":
                message = 'Password must be max 50 characters'
                break;
            default:
                message = 'Password must not have spaces'
        }
        if(message == ! ''){
            return message;
        }
    }
    if(newPassword === oldPassword){
        return "New and Old Passwords should be different!"
    }
    return message;
}

export function formatDate(date){
    if(date){
        return date.replace('T', ' ').substr(0, 19);
    }
}
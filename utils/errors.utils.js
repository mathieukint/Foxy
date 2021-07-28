module.exports.signUpErrors = (err) => {
    let errors = {pseudo: "", email: "", password: ""};

    if (err.message.includes("pseudo")) {
        errors.pseudo = 'pseudo incorrect ou déjà pris';
    }

    if (err.message.includes("email")) {
        errors.email = 'e-mail incorrect';
    }

    if (err.message.includes("password")) {
        errors.password = 'mot de passe doit contenir 6 caractères minimum';
    }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
        errors.pseudo = 'pseudo déjà utilisé';
    }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
        errors.email = 'e-mail déjà enregistré';
    }

    return errors;
}

module.exports.logInErrors = (err) => {
    let errors = {pseudo: "", password: ""};

    if (err.message.includes("pseudo")) {
        errors.pseudo = 'pseudo incorrect';
    }

    if (err.message.includes("password")) {
        errors.password = 'mot de passe incorrect';
    }

    return errors;
}

// module.exports.logOutErrors = (err) => {
    
// }
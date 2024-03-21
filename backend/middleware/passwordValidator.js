const passwordValidator = require('password-validator');
let passwordValid = new passwordValidator();

passwordValid
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {

    const url = req.baseUrl;
    const pwd = req.body.password;

    if (url == '/api/user' && pwd == undefined)  return next();
    
    if (!passwordValid.validate(pwd)) {
        return res.status(400).json({ error: "le mot de passe n\'est pas valide : " + passwordValid.validate(pwd, { list: true }) });
    }
    next();
}
const bcrypt = require('bcrypt');
const User = require('../models/User');
const func = require('../function');
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRETKEY;

exports.token = (req, res, next) => {
    const Token = req.cookies['jwt'];
    if (Token === null) return res.sendStatus(401)
    func.verifCookie(Token, req, res)
};

exports.checkToken = (req, res, next) => {
    const { token } = req.body;
    return jwt.verify(token, SECRETKEY, (err) => {
        if (err) return res.sendStatus(401)
        res.status(200).json({ Message: 'Token is valid', accessToken: token })
    })
};


exports.signup = (req, res, next) => {

    let service = req.body.service
    let role = req.body.role

    if (req.auth.userRole === 'admin_service') {
        service = req.auth.userServiceId;
        role = 'admin_service'
    }
    else if (req.auth.userRole === 'admin') {
        service = req.body.service;
        role = req.body.role
    }
    else { throw new Error('Access denied'); }

    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            if (role === 'admin') { service = null; }
            if ((role === 'admin_service' || role === 'user') && typeof service === 'string') { service = Number(service); }

            const user = new User({
                last_name: req.body.lastName,
                first_name: req.body.firstName,
                email: req.body.email,
                password: hash,
                role: role,
                service_id: service
            })

            user.save()
                .then((response) => {
                    delete response.dataValues.password
                    res.status(201).json({ message: 'Utilisateur créé !', user: response })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signin = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' });
                    const token = func.createToken(user.id);
                    const setCookie = func.setCookie(res, token)
                    setCookie.status(201).json({ message: 'Cookies created', accessToken: token, id: user.id })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.signout = (req, res, next) => {
    const token = req.cookies['jwt'];
    if (token === null) return res.status(401).json({ Message: 'Token Missing in the Cookie' })
    const verifToken = ''
    const setCookie = func.clearCookies(res, verifToken)
    setCookie.status(201).json({ message: 'Cookies expired' })
}


exports.resetPassword = (req, res, next) => {

    const { email } = req.body;

    User.findOne({ where: { email } })
        .then(user => {

            if (!user) { throw new Error('Access denied') }

            const token = jwt.sign({ userId: user.id }, process.env.SECRETKEY, { expiresIn: '8m' });
            const resetLink = `${process.env.APP_HOST}/reset-password/${token}`;

            return res.status(200).json({ message: "Email de réinitialisation de mot de passe envoyé avec succès", link: resetLink });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.resetNewPassword = (req, res, next) => {

    const { token, password } = req.body;

    jwt.verify(token, SECRETKEY, (err, decoded) => {
        if (err) return res.sendStatus(401)

        const userId = decoded.userId;
        bcrypt.hash(password, 10)
            .then(hash => {
                User.update({ password: hash }, { where: { id: userId } })
                    .then(() => res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' }))
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    })

};
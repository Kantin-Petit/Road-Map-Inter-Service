require('dotenv').config()
const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;
const MAXAGE = process.env.MAXAGE;
const MAXAGE_COOKIES = parseInt(process.env.MAXAGE_COOKIES) * 60 * 60 * 1000;

// JsonWebToken

exports.createToken = (id) => {
   return jwt.sign({ id }, SECRETKEY, {
      expiresIn: MAXAGE,
   })
};

exports.verifCookie = (Token, req, res) => {
   return jwt.verify(Token, SECRETKEY, (err) => {
      if (err) return res.status(200).json({ Message: 'Pas de Token' })
      res.setHeader('Authorization', 'Bearer ' + Token)
      res.status(200).json({ Message: 'Got your token back', accessToken: Token })
   })
};

exports.setCookie = (res, refreshToken) => {
   return res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: MAXAGE_COOKIES, secure: false })
};

exports.clearCookies = (res, token) => {
   return res.cookie('jwt', token, { httpOnly: true, maxAge: 0, secure: false })
};

// Associations

exports.belongsTo = (tab1, tab2, key) => {
   return tab1.belongsTo(tab2, { foreignKey: key });
}

exports.belongsToMany = (tab1, tab2, association, key) => {
   return tab1.belongsToMany(tab2, { through: association, foreignKey: key });
}
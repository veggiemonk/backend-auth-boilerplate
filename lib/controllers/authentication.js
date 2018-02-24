const jwt = require('jwt-simple');
const { secretOrKey: secret } = require('../../config');
const User = require('../models/user');

function tokenForUser({ id: sub }) {
  return jwt.encode({ sub, iat: Date.now() }, secret);
}

module.exports.signup = function signup(req, res, next) {
  const { body: { email, password } } = req;

  if (!email || !password) {
    return res.status(422).send({ error: 'missing email or password' });
  }
  return User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email alreay used' });
    }

    const user = new User({
      email,
      password,
    });

    return user.save(errSave => {
      if (errSave) return next(errSave);
      return res.json({ token: tokenForUser(user) });
    });
  });
};

module.exports.signin = function signin(req, res) {
  const { user } = req;
  res.send({ token: tokenForUser(user) });
};

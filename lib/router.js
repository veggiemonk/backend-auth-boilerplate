const passport = require('passport');
const { signin, signup } = require('./controllers/authentication');
const passportService = require('./services/passport'); // eslint-disable-line no-unused-vars

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signup', signup);
  app.post('/signin', requireSignIn, signin);
};

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy } = require('passport-github');

const users = require('../db/services/user');
const JWT_KEY = "giraffesarecool"

const router = express();

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
  },

  function (accessToken, refreshToken, profile, cb) {
    users.findOrCreate(profile);
    return cb(null, profile);
  }
));

router.get('/github', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('github', { scope: [], state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  return next();
});

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), 
  (req, res, next) => {
    const token = jwt.sign({id: req.user.id}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      console.log('req.user: ', req.user);
      if (err) return next(err); ;
      res.redirect(`http://localhost:3000?token=${token}`)
    });
        
  },
);

module.exports = router;
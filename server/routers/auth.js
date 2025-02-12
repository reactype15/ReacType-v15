const router = require('express').Router();
const passport = require('passport');
const config = require('../../config');
const { API_BASE_URL } = config;

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile']
  })
);

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  console.log('this authenticate function is being run');
  console.log(req.user.id);
  res.cookie('ssid', req.user.id);
  return res.redirect(API_BASE_URL);
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log('google authenicate function being run');
  res.cookie('ssid', req.user.id);
  return res.redirect(API_BASE_URL);
});

module.exports = router;

const express = require('express');
const passport = require('passport');

const { register, login, getMe } = require('../controllers/auth');
const protect = require('../middleware/auth/protect');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/api/auth/me');
});

module.exports = router;

const express = require('express');
const passport = require('passport');

const { register, login, getMe } = require('../controllers/auth');
const protect = require('../middleware/auth/protect');
const sendTokenResponse = require('../utils/sendTokenResponse');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Google routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  sendTokenResponse(req.user, 200, res);
});

module.exports = router;

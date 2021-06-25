const express = require('express');

const protect = require('../middleware/auth/protect');
const authorize = require('../middleware/auth/authorize');

const router = express.Router();

router.get('/', protect, authorize, (req, res) => res.send('Admin'));

module.exports = router;

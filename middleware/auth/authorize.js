const jwt = require('jsonwebtoken');

const asyncHandler = require('../asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const User = require('../../models/User');

const authorize = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`You are not authorized to access this route`, 403)
    );
  }
  next();
};

module.exports = authorize;

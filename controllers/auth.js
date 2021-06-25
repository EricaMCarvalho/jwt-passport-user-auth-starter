const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');
const User = require('../models/User');

/*
 * Desc:    Register user
 * Route:   POST /api/auth/register
 * Access:  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 200, res);
});

/*
 * Desc:    Login user
 * Route:   POST /api/auth/login
 * Access:  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Email and password are required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

/*
 * Desc:    Get current logged in user
 * Route:   GET /api/auth/me
 * Access:  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routers
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.send('The API is running...'));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.inverse
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

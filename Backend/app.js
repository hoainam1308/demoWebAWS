var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/Booking').then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});
const secret_key = process.env.JWT_SECRET;
var indexRouter = require('./routes/index');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret_key));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/', indexRouter);
app.use('/auths', require('./routes/auths')); // Ensure this line is added to use the auths route
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles')); // Ensure this line is added to use the roles route
app.use('/orders', require('./routes/orders')); // Ensure this line is added to use the orders route
app.use('/vnpay', require('./routes/vnpay')); // Ensure this line is added to use the vnpay route
app.use('/categories', require('./routes/categories')); // Ensure this line is added to use the categories route
app.use('/products', require('./routes/products')); // Ensure this line is added to use the
console.log("App is loaded");


module.exports = app;

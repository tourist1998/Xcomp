const express = require('express'); 
const app = express();   
const xss = require('xss-clean');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');

const cookieparser = require('cookie-parser');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cookieparser());

app.use(express.static(path.join(__dirname,'public')));  
app.set('view engine','pug'); 
app.set('views',path.join(__dirname,'view'));   

const UserRouter = require('./Router/user.js');
const NeedRouter = require('./Router/Need.js');
const AvailabilityRouter = require('./Router/Availability');
const ViewController = require('./controller/ViewController.js');
const Allocate = require('./Router/Allocate');
// Database connection

app.use(morgan('dev')); // tell us about our log 
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV != 'development') { 
  app.use(morgan('dev'));
}

// Data sanitization against XSS
app.use(xss());

// Test middleware 
app.use((req,res,next) => {
   // console.log(req.cookies);
    next();
});

app.use('/api/v1/User',UserRouter);
app.use('/api/v1/Need',NeedRouter);
app.use('/api/v1/Availability',AvailabilityRouter);
app.use('/',ViewController);
app.use('/api/v1/Allocate',Allocate); 

app.all('*',(req,res,next) => {
  const err = new Error();
  err.statusCode = 404;
  err.status = 'fail'
  err.message = `Not able to find ${req.originalUrl}`
  next(err);
})

app.use((err,req,res,next) => { // Global error handling middleware. 
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error'   
	res.status(err.statusCode).json({
		Status : err.status,
		Message : err.message
  });
})

module.exports = app; 
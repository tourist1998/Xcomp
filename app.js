const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const cookieparser = require('cookie-parser');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cookieparser());

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'view')); 

const UserRouter = require('./Router/user.js');
const NeedRouter = require('./Router/Need.js');
const AvailabilityRouter = require('./Router/Availability.js');
const ViewController = require('./controller/ViewController.js');
const Allocate = require('./Router/Allocate');
// Database connection
mongoose.connect("mongodb://localhost:27017/xstarvation",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=> console.log('Database connected'))
  .catch((err)=> console.log(`error ${err}`));


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
  res.status(404).json({
     status : 'fail',
     message : ' Not able to find this link'
  });
})


app.listen(3000,() => {
    console.log(`Listening on port 3000`);
})
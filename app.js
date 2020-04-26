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

const UserController = require('./controller/UserController.js');
const NeedController = require('./controller/NeedController.js');
const AvailabilityController = require('./controller/AvailabilityController.js');
const ViewController = require('./controller/ViewController.js');
// Database connection
mongoose.connect("mongodb://localhost:27017/xstarvation",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=> console.log('Database connected'))
  .catch((err)=> console.log(`error ${err}`));




app.use('/api/v1/User',UserController);
app.use('/api/v1/Need',NeedController);
app.use('/api/v1/Availability',AvailabilityController);
app.use('/',ViewController);


app.listen(3000,() => {
    console.log(`Listening on port 3000`);
})
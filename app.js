const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const cookieparser = require('cookie-parser');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cookieparser());


const UserController = require('./controller/UserController.js');
const NeedController = require('./controller/NeedController.js');

// Database connection
mongoose.connect("mongodb://localhost:27017/xstarvation",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=> console.log('Database connected'))
  .catch((err)=> console.log(`error ${err}`));




app.use('/api/v1/User',UserController);
app.use('/api/v1/Need',NeedController);





app.listen(3000,() => {
    console.log(`Listening on port 3000`);
})
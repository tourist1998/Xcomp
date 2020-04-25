const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect("mongodb://localhost:27017/xstarvation",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=> console.log('Database connected'))
  .catch((err)=> console.log(`error ${err}`));

app.get('/',(req,res,next) => {
    console.log('Hello I am back');
})

app.listen(3000,() => {
    console.log(`Listening on port 3000`);
})
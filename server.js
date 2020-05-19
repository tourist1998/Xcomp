const mongoose = require('mongoose');
const dotenv = require('dotenv'); // to read environment variable

dotenv.config({path : './config.env'}) // This command help to read file and save them in nodejs environment variable. 

const app = require('./app');
 // Here we storing something that is not related to express but is important for development process ie - error handling , Database connection 

mongoose.connect(`${process.env.LOCAL_DATABASE}`,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=> console.log('Database connected'))
  .catch((err) =>
    console.log(`error ${err}`));


const port = process.env.PORT || 3000; 

app.listen(port,() => {
    console.log(`Listening on port ${process.env.PORT}`);
})


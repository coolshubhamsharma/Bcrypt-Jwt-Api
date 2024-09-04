const express = require('express');
const app = express(); //instance of objectconst mongoose = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = require('./routes/user');

mongoose.set('strictQuery' , true);
mongoose.connect('mongodb://127.0.0.1:27017/JWT-DEMO')
.then(()=>{
   console.log('db connected')
})
.catch((e)=>{
   console.log(e);
})

app.use(express.json()); //for parsong json data
app.use(router);

app.get('/' , (req , res)=>{
   res.send('route route hai');
})






app.listen(8080 , ()=>{
    console.log('server started at port 8080');
})
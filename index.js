const express = require('express');
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=> console.log("Mongo Db connected"));

const userRoute = require('./router/user');


app.set('view engine','ejs');
app.set('views',path.resolve('./viewer')); 

app.use(express.urlencoded({extended:false}));


app.get('/',(req,res)=>{
 res.render("home");
});

app.use('/user',userRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`));
const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const clookiesPaser = require('cookie-parser');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=> console.log("Mongo Db connected"));

const userRoute = require('./router/user');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');


app.set('view engine','ejs');
app.set('views',path.resolve('./viewer')); 

app.use(express.urlencoded({extended:false}));
app.use(cookieParser);
app.use(checkForAuthenticationCookie("token"));



app.get('/',(req,res)=>{
 res.render("home",{
    user:req.user
 });
});

app.use('/user',userRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`));
require('dotenv').config();

const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const clookiesPaser = require('cookie-parser');
const {Blog} = require('./model/blogSchema');

const app = express();
const PORT =  process.env.PORT || 8000;

//mongodb://127.0.0.1:27017/blogify
mongoose.connect(process.env.MONGO_URL).then((e)=> console.log("Mongo Db connected"));



const userRoute = require('./router/user');
const blogRoute = require('./router/blog');

const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');


app.set('view engine','ejs');
app.set('views',path.resolve('./viewer')); 

app.use(express.urlencoded({extended:false}));
 app.use(cookieParser());
 app.use(checkForAuthenticationCookie("token"));
 app.use(express.static(path.resolve("./public")));


app.get('/', async (req,res)=>{
    const allBlogs = await Blog.find({});
    
 res.render("home",{
    user:req.user,
    blog:allBlogs,
 });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`));
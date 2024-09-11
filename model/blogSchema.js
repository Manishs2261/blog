const {Schema ,moel, model} = require("mongoose");
const { create } = require("./user");

const blogSchema = new Schema({
    title:{
        type:String,
        requred:true,
    },
    body:{
        type:String,
        requred:true,
    },
    coverImageURL:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }

},{timestamps:true}
);

const Blog = model('blog',blogSchema);

module.exports ={
    Blog,
}

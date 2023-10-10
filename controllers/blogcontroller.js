const post = require("../models/postmodel");
// const hbs = require("hbs");

// hbs.registerHelper('gt', function(a, b, options) {
//     return a > b ? options.fn(this) : options.inverse(this);
//   });

const loadblog = async(req,res) =>{
    try {
        const posts = await post.find({});
        console.log(posts);
        res.render("blog",{posts:posts});
    } catch (error) {
        console.log(error.message);
    }
};
const loadblogdetail = async(req,res) => {
   try {
    const posts = await post.find({});
   } catch (error) {
    console.log(error);
   }
} ;
module.exports={
    loadblog,
    loadblogdetail
}

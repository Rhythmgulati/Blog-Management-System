const blogsetting = require("../models/blogsettingmodel");
module.exports  = async(req,res,next) => {
 try {
   const blogs = await blogsetting.find({});
   blogs.length = 1;
   if(blogs.length == 0 && req.originalUrl != "/blog-setup"){
     res.redirect('/blog-setup');
   }else{
      next();
   }
 } catch (error) {
    console.log(error);
 }
}; 



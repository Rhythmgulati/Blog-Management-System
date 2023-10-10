const blogsetting = require("../models/blogsettingmodel");
const user = require("../models/usermodel");
const postm = require("../models/postmodel");
const bcrypt = require("bcrypt");





const blogSetup = async(req,res)=>{
    try {
        var blogsettings = await blogsetting.find({});
        if(blogsettings.length <0){
            res.redirect("/login");
        }
        else{
            res.render("blogsetup");
        }
    } catch (error) {
        console.log(error);
    }
}
const blogSetupsave = async (req,res) => {
    try {
        const blogtitle = req.body.title;
        const blogimg = req.body.image;
        const Description = req.body.description;
        const Name = req.body.adminname;
        const Email = req.body.email;
        const Password=  await bcrypt.hash(req.body.password ,10);

        const blogSetting = new blogsetting({
            blog_title:blogtitle,
            blog_logo:blogimg,
            description:Description
        });
        await blogSetting.save();

        const User = new user({
            name:Name,
            email:Email,
            password:Password,
            isadmin:1
        });

        const userdata = await User.save();
        if(userdata){
            res.redirect('/login');
        }
        else{
            res.render('blogsetup',{message:'blog setup failed'});
        }

    } catch (error) {
        console.log(error);
    }
};
const dashboard = async (req,res) =>{
    try {
        res.render("dashboard");
    } catch (error) {
        console.log(error);
    }
}
const loadpostdashboard = async (req,res) =>{
    try {
        res.render("post");
    } catch (error) {
        console.log(error);
    }
}

const addpost = async (req,res) =>{
    try {
        const post = new postm({
            title:req.body.title,
            content:req.body.content
        });
        const postdata = await post.save();
        res.render("post",{message:"posted suceesfully"})
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    blogSetup,
    blogSetupsave,
    dashboard,
    loadpostdashboard,
    addpost
} 
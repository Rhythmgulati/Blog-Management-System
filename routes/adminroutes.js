const express = require("express");
const admincontroller = require("../controllers/admincontroller");
const adminroutes = express();
const bodyparser = require('body-parser');
adminroutes.use(bodyparser.json());
const path=require("path");
const hbs = require("hbs");
adminroutes.use(bodyparser.urlencoded({extended:true}));

const multer = require("multer");

const staticpath = path.join(__dirname,"../public");
const templatepath =  path.join(__dirname,"../templates/views");
const partialpath =  path.join(__dirname,"../templates/partials");
console.log(staticpath);
adminroutes.set('view engine','hbs');
adminroutes.set('views',templatepath);
adminroutes.use(express.static(staticpath));
hbs.registerPartials(partialpath);

const adminloginauth =require("../middlewares/adminloginauth");
const config = require('../config/config');
const session = require("express-session"); 
adminroutes.use(session({secret:"hello",
    resave:true,
    saveUninitialized:true
}));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,"../public/images"));
    },
    filename:function(req,file,cb){
     const name = Date.now()+'-'+file.originalname;
      cb(null,name);
    }
});

const upload = multer({storage:storage});


adminroutes.get("/blog-setup",admincontroller.blogSetup);
adminroutes.post("/blog-setup",upload.single('image'),admincontroller.blogSetupsave);
adminroutes.get("/dashboard",adminloginauth.islogin,admincontroller.dashboard);
adminroutes.get("/createpost",admincontroller.loadpostdashboard);
adminroutes.post("/createpost",admincontroller.addpost);

module.exports = adminroutes;

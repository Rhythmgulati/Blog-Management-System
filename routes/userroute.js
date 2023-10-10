const express = require("express");
const userroutes = express();
const path=require("path");
const hbs = require("hbs");
const session = require("express-session"); 
const bodyparser = require('body-parser');
userroutes.use(bodyparser.json());
userroutes.use(bodyparser.urlencoded({extended:true}));

const staticpath = path.join(__dirname,"../public");
const templatepath =  path.join(__dirname,"../templates/views");
const partialpath =  path.join(__dirname,"../templates/partials");
console.log(staticpath);
userroutes.set('view engine','hbs');
userroutes.set('views',templatepath);
userroutes.use(express.static(staticpath));
hbs.registerPartials(partialpath);


const usercontroller = require("../controllers/usercontroller"); 
const config = require('../config/config');
const adminloginauth =require("../middlewares/adminloginauth");

userroutes.use(session({
    secret:"hello",
    resave:true,
    saveUninitialized:true
}));


const multer = require("multer");



userroutes.get("/login",adminloginauth.islogout,usercontroller.loadLogin);
userroutes.post("/login",usercontroller.verifylogin);
userroutes.get("/profile",usercontroller.profile);
userroutes.get("/logout",adminloginauth.islogin,usercontroller.logout);


module.exports = userroutes;
const express = require("express");
const blogroutes = express();

const path=require("path");
const hbs = require("hbs");


const staticpath = path.join(__dirname,"../public");
const templatepath =  path.join(__dirname,"../templates/views");
const partialpath =  path.join(__dirname,"../templates/partials");
console.log(staticpath);
blogroutes.set('view engine','hbs');
blogroutes.set('views',templatepath);
blogroutes.use(express.static(staticpath));
hbs.registerPartials(partialpath);
const blogcontroller = require("../controllers/blogcontroller")

blogroutes.get("/",blogcontroller.loadblog);
blogroutes.get("/blogdetail",blogcontroller.loadblogdetail);

module.exports = blogroutes;
const user = require("../models/usermodel");
const bcrypt = require("bcrypt");


const loadLogin = async (req,res) =>{
     try {
        res.render('login');
     } catch (error) {
        console.log(error);
     }
}


const verifylogin = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userdata = await user.findOne({email:email});

        if(userdata){
             const pssmatch = await bcrypt.compare(password,userdata.password);
             if(pssmatch){
                req.session.user_id = userdata.__id;
                req.session.isadmin = userdata.isadmin;
                 if(userdata.isadmin==1){
                    res.redirect('/dashboard');
                 }
                 else{
                   res.redirect('/profile');
                }
             }else{
                res.render("login",{message:"Invalid creadentials"});
            }}
      
        }
     catch(error) {
        console.log(error);
    }
}

const profile = async (req,res) => {
    try {
        res.render();
    } catch (error) {
        console.log(error);
    }
}

const logout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect("/login")
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    loadLogin,
    verifylogin,
    profile,
    logout
}
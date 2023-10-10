const islogin = async (req, res, next) => {
    try {
      if (req.session.isadmin == 1){
        next();
      }
       else {
         res.redirect("/login");
        }
       
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const islogout = async (req, res, next) => {
    try {
      if (req.session.isadmin == 1) {
        // User is logged in as an admin, proceed to next middleware
        res.redirect("/dashboard");
       
      }
    next();
      
    } catch (error) {
      console.log(error.message);
    }
  };
  

module.exports = {
    islogin,
    islogout
}
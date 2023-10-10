const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("./db/conn");
const PORT = 3000 ;

const isBlog = require("./middlewares/isblog");
app.use(isBlog);

 
const adminroutes = require("./routes/adminroutes");
app.use("/",adminroutes);
const userroutes = require("./routes/userroute");
app.use("/",userroutes);
const blogroutes = require("./routes/blogroute");
app.use("/",blogroutes);





app.listen(PORT , ()=>{
    console.log(`running at ${PORT}`);
});

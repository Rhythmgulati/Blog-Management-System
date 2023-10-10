const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BMS",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected");
}).catch(()=>{
    console.log("db conn failed");
});
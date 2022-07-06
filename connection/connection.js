
const mongoose = require("mongoose");

const url = "mongodb+srv://gkashyap9602:anilkush@cluster0.hp9xj.mongodb.net/SchoolDatabase?retryWrites=true&w=majority"

// "mongodb://localhost:27017/blockbrew"
 
 mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,},function(err){
if (err) throw (err);
console.log("connected successfully connection side");

})
const db = mongoose.connection;

module.exports = {db}

// db.createCollection("Users_Data",(err,res)=>{
// if (err) throw (err)
// console.log("Collection Created Successfully " + res);
// })
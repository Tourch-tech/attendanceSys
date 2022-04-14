const mongoose= require("mongoose");

const Schema= mongoose.Schema

const attendance= new Schema({
    name:String,
    phone:Number,
    date:{type:String, default:Date(),}
});


const addAtt= mongoose.model("attendace", attendance)

module.exports= addAtt;
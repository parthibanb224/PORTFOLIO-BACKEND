const mongoose = require('mongoose');
const {Schema} = mongoose;

const responseSchema = new Schema({
    name : {type:String, required:false},
    email : {type:String, required:false},
    message : {type:String, required:true}
})

module.exports = mongoose.model("response",responseSchema);
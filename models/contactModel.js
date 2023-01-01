const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Contact',contactSchema)
const mongoose = require("mongoose")

const prodScmeha = mongoose.Schema({
    name:{type:String},
    desc:{type:String},
    price:{type:Number}
})

const prodModel = mongoose.model("prod",prodScmeha)


module.exports={
prodModel    
}



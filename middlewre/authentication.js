const jwt = require("jsonwebtoken")
const{backlistModel}= require("../model/backlist")
const{userModel}= require("../model/userModel")
require("dotenv").config()

const authentication =async(req,res,next)=>{
try {

    const{AccessToken}= req.cookies
    const baclistedtoken = await backlistModel.findOne({token:AccessToken})
if(baclistedtoken){
       return res.send("you are logged out please login again")
   }

   if(AccessToken){
        jwt.verify(AccessToken,process.env.accessKey,async(err,decode)=>{
if(decode){

const id = decode.userID
const user = await userModel.findOne({_id:id})
const role =user.role
req.role = role
//console.log(r)

next()
}else{
    res.send({"msg":"please login first"})
}
     })
    }else{
        res.send({"msg":"plz login"})
    }


     } catch (error) {
        res.send(error.message)
     }


}

module.exports={
    authentication
}
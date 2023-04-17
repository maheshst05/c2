const {prodModel} = require("../model/productModel")
const{backlistModel} =  require("../model/backlist")
const express = require("express")
const{authentication} =  require("../middlewre/authentication")
const ProdRotes = express.Router()
const jwt = require('jsonwebtoken');
const{authrised} = require("../middlewre/authrised")
//access
ProdRotes.get("/products",authentication,async(req,res)=>{

    try {
        const prod =  await prodModel.find()
        res.send(prod)
        
    } catch (error) {
        res.send(error.message)
    }
})



//add product
ProdRotes.post("/addproducts",authentication,authrised(['saller']),async(req,res)=>{
const {name,desc,price} =  req.body

    try {
        
        const newprod = new prodModel({name,desc,price})
   await newprod.save()
   res.send("new product added successfully..")
    } catch (error) {
        res.send(error.message)
    }
})

//delete
ProdRotes.delete("/deleteproducts/:id",authentication,authrised(['selle']),async(req,res)=>{
const id = req.params.id  
    try {

        const prod =  await prodModel.findByIdAndDelete({_id:id})
        res.send("deleted")
        
    } catch (error) {
        res.send(error.message)
    }
})

//logout
ProdRotes.get("/logout",authentication,async(req,res)=>{
    try {
       
    const{AccessToken}= req.cookies
    console.log(AccessToken)
    const backlitedtoken = new backlistModel({token:AccessToken})
    await backlitedtoken.save()
    res.send("logout successfully")
    
    } catch (error) {
        res.send(error.message)
    }

})

//refreshtoken
ProdRotes.get("/refreshtoken",async(req,res)=>{

    const{RefreshToken}= req.cookies;
    const decoded = jwt.verify(RefreshToken, process.env.refreshtokenkey)
    if(decoded){
      const accessToken = jwt.sign({ userID: decoded.userID}, process.env.accessKey,{
        expiresIn:1000*60
    });
      res.cookie("AccessToken", accessToken, { maxAge: 1000 * 60 });
     
      return res.send(accessToken)
    }

    else{
      res.send("invalid refresh token, plz login again")
    }
})

module.exports={
    ProdRotes
}
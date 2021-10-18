const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
// Models
const User = require("../models/User");

//  JWT Secret
const jwtKey = "devankit01";

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create(req.body);
    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwtKey
    );
    res.json({
      data: req.data,
      token: token,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/signin',async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
      return res.status(422).send({error :"must provide email or password"})
  }
  const user = await User.findOne({email})
  if(!user){
      return res.status(422).send({error :"must provide email or password"})
  }
  try{
    await user.comparePassword(password); 
    console.log('USER ' + user)   
    const token = jwt.sign({userId:user._id},jwtKey)
    res.send({token})
  }catch(err){
      return res.status(422).send({error :"Invalid Credentials"})
  }
  

})

router.get("/signup", (req, res) => {
  console.log("GET Request");
});

module.exports = {
  router,
};

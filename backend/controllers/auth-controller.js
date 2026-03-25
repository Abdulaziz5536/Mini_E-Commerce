const express = require('express');
const User = require('../models/auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req,res) => {
  const {name,email,password} = req.body;

  try{

    const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(400).json({error:"user already exists"});
  }
  if(!email.includes('@')){
    return res.status(400).json({error:"email is invalid"});
  }
  if(password.length !== 4){
    return res.status(400).json({error:"password should be four digits"});
  }
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password,salt);

  const user = await User.create({name,email,password:hashedPassword});
  res.json({message:"user created successfully"});

  }catch(error){
    res.status(500).json({error:"server not working"});
  }

  
};

const login = async (req,res) => {
  const {email,password} = req.body;

  try{
    const user = await User.findOne({email});
  
    if(user && (await bcrypt.compare(password,user.password))){

      const token = jwt.sign(
        { id: user._id, role: user.role },   
        process.env.JWT_SECRET,
        { expiresIn:"7d" }
      );

      return res.status(200).json({
        message:"logged in successfully",
        token,
        role:user.role
      });

    } else {
      return res.status(400).json({error:"invalid credentials"});
    }

  } catch(error){
    res.status(500).json({error:"server not working"});
  }
}
  


module.exports = {register,login};
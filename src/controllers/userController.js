const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

async function signUp(req,res){
   /**
    Steps to Implement
     1.Existing user check
     2.Hashed Password (bcrypt)
     3.User Creation
     4.Token Generate (JWT)
    **/
  const {username,email,password} = req.body;
  try{
    const existingUser = await userModel.findOne({email:email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const saltRounds = 10; // function will hash password 10 times
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    const result = await userModel.create({
        username: username,
        password:hashedPassword,
        email:email
    });
 
    const token = jwt.sign({email:email,id:result._id},SECRET_KEY);
    res.status(201).json({user:result,token:token});


  }catch(error){
    console.log(`SignUp Error: ${error}`);
    res.status(500).json({message:"Something went wrong"});
  } 
};
/** 
 We can also define function as 
 const signUp = async(req,res)=>{
    //Logic
 } ;
 **/
async function signIn(req,res){
    const {email,password} = req.body;

    try {
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credential"});
        }
        
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
       
        return res.status(200).json({user:existingUser,token:token});


    } catch (error) {
        console.log(`SignIp Error: ${error}`);
        res.status(500).json({message:"Something went wrong"});
    }
};

module.exports={
    signUp,
    signIn,
}
import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";

export const register = async(req, res) => {
   try{
       const {name, email, password} = req.body;
          const existUser = await User.findOne({email});
          if(existUser){
              return res.status(400).json({message:"User already exist"});
          }
          if(!validator.isEmail(email)){
                return res.status(400).json({message:"Invalid email"});
          }
          if(password.length < 8){
                return res.status(400).json({message:"Enter Strong Password"});
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({
            name,
            email,
            password: hashedPassword
          });
          const token = await generateToken(user._id);
          res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000
          });
          res.status(201).json({message:"User created successfully", user});
          console.log("User created successfully");
   }
    catch(error){
        console.log("Register error");
        res.status(500).json({message:`Register error ${error}`});
    }
}


export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User .findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }                   
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }


        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000
        });
        res.status(200).json({message:"Login successful", user});
        console.log("Login successful");
    }   
    catch(error){
        console.log("Login error");
        res.status(500).json({message:`Login error ${error}`});
    }
}


export const logout = async(req, res) => {
    try{
        res.clearCookie("token");       
        res.status(200).json({message:"Logout successful"});
        console.log("Logout successful");
    }
    catch(error){
        console.log("Logout error");
        res.status(500).json({message:`Logout error ${error}`});
    }
}


export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log("Google Data:", req.body);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    //if user not exist → create
    if (!user) {
      user = await User.create({
        name: name || "User",
        email,
        password: "google_auth",
      });
    }

    // generate token
    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Google login success",
      user,
    });

  } catch (error) {
    console.log("GoogleLogin error:", error); 
    res.status(500).json({
      message: "Google login failed",
    });
  }
};




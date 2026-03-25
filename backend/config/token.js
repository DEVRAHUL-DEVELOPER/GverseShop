import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
    try{
        const token = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:"7d"});
        return token;
    }
    catch(error){
        console.log("token error")
    }
}
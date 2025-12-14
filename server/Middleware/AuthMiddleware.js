import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const verifyToken = async(req,res,next) => {
    try{
    const token = req.cookies?.jwt;
    if(!token) return res.status(401).json({success : false,message : "token dont exist"});
    let decoded = jwt.verify(token,process.env.JWT_KEY);
    req.userId = decoded?.userId;
    next();
    } catch(err){
        if(err.name === "TokenExpiredError"){
           return res.status(401).json({success : false,message : "token is invalid"});
        }
        return res.status(500).json({success : false,message : "Internal server error"});
    }
}
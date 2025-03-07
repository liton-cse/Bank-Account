import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/dotenv.js'

 export const AuthenticateJWT =(req,res,next)=>{
    const token = req.header('Auhtorization');
    if(!token){
        return(res.status(401).json({message:'Unauthorize'}));
    }

    jwt.verify(token,SECRET_KEY,(error, user)=>{
        if(error){
            return(res.status(403).json({message:'Fordnidden'}));
        }
        req.user= user;
        next();
    }); 
 };
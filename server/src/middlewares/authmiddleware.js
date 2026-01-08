import jwt from 'jsonwebtoken';

export const authmiddleware = (req,res,next)=>{
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message:"No token provided",status:false});
    }
    try{
        const decoded = jwt.verify(token,process.env.secretkey);
    
        req.userid = decoded?.subid;
        next();

    }catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized access",status:false});
    }
}
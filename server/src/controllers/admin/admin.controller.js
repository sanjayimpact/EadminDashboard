
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/admin/admin.models.js";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import dotenv from 'dotenv';
dotenv.config();

let salt = 10;



export const creatadmin = async(req,res)=>{
    const{name,email,password} = req.body;
    try{
       let existinguser = await Admin.findOne({email:email});
       if(existinguser){
        return res.status(400).json({message:"Admin already exists",status:false});
       }else{
        let hashedpassword = await bcrypt.hash(password,salt);
        const newuser = new Admin({
            name,
            email,
            password:hashedpassword
        })
        let data = await newuser.save();
        data.password = undefined;
        data.twoFactorSecret = undefined;
        data.twoFactorTempSecret = undefined;
        return res.status(201).json({message:"Admin created successfully",status:true,data:data});
       }
    }catch(err){
        console.log("Error in creatuser controller",err);
    }
}

export const loginadmin = async(req,res)=>{
    const{email,password} = req.body
    try{
      //check existing user 
      let checkemail = await Admin.findOne({email:email});
      if(!checkemail){
        return res.status(400).json({message:"Admin does not exist",status:false});
      }    
      //check password
      const ispaawordcorrect = await bcrypt.compare(password,checkemail.password);
      if(!ispaawordcorrect){
        return res.status(400).json({message:"Invalid credentials",status:false});
      }
      const token = jwt.sign({subid:checkemail._id},process.env.secretkey,{expiresIn:"2m"});
      const refreshtoken = jwt.sign({subid:checkemail._id},process.env.rfsecretkey,{expiresIn:"30d"}); 
 res.cookie('refreshtoken', refreshtoken, {
  httpOnly: true,
  secure: false,       // MUST be false on http
  sameSite: 'lax',     // ✅ FIX
  maxAge: 30 * 24 * 60 * 60 * 1000
});

  //create jwt token
    return res.status(200).json({message:"Login successful",status:true,data:checkemail.email,token:token});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",status:false});
    }
}



export const refreshtoken  =async(req,res)=>{
    const refreshtoken = req.cookies.refreshtoken;
    if(!refreshtoken){
        return res.status(401).json({message:"No refresh token provided",status:false});
    }
    try{
        const decoded = jwt.verify(refreshtoken,process.env.rfsecretkey);
        const newtoken = jwt.sign({subid:decoded.subid},process.env.secretkey,{expiresIn:"2m"});
        return res.status(200).json({message:"New token generated",status:true,token:newtoken});
    }catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized access",status:false});
    }
}

export const logoutadmin = async(req,res)=>{
    try{ 
        const refreshtoken = req.cookies.refreshtoken;
        if(!refreshtoken){
            return res.status(400).json({message:"No refresh token found",status:false});
        }
        res.clearCookie('refreshtoken',{
        httpOnly: true,
  secure: false,       // MUST be false on http
  sameSite: 'lax',     // ✅ FIX
  maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({message:"Logout successful",status:true});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",status:false});
    }
}

export const admininfo = async(req,res)=>{
    const id = req.userid;

    try{
        //check the details 
        const admininfo = await Admin.findById(id).select("-password -twoFactorSecret -twoFactorTempSecret");
        if(!admininfo){
            return res.status(404).json({message:"Admin not found",status:false});
        }
        return res.status(200).json({message:"Admin info fetched successfully",status:true,data:admininfo});
       
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",status:false});
    }
}



//enable two factor authentication

export const enable2FA = async(req,res)=>{
    const id = req.userid;
    try{
       const secret = speakeasy.generateSecret({
        length:20,
        name:`EcommerceApp`,
       })
       const qrcodeurl = await qrcode.toDataURL(secret.otpauth_url);
    const updateadmin = await Admin.findByIdAndUpdate(id,{
       twoFactorTempSecret:secret.base32 
    },{new:true})
    return res.status(200).json({status:true,data:qrcodeurl});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",status:false});
    }
}

export const verify2FA = async (req, res) => {
   const {token} = req.body;

  const id = req.userid;
  try{
  const user = await Admin.findById(id);
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorTempSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.twoFactorSecret = user.twoFactorTempSecret;
  user.twoFactorTempSecret = null;
  user.twoFactorEnabled = true;
  await user.save();
  
  return res.json({ success: true });
  }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",status:false});
  }

};


export const check2fa = async(req,res)=>{
    const id = req.userid;

    try{
        //check two step is active or not
        let check = await Admin.findOne({_id:id});
        if(check){
            return res.status(200).json({message:"Check two step",twostep:check?.twoFactorEnabled,status:true})
        }
        return res.status(400).json({message:"Id Not Found",status:false})
        
       
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message,status:false})
    }
}

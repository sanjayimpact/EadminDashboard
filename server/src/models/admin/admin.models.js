import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
     twoFactorEnabled: {
    type: Boolean,
    default: false,
  },

  twoFactorSecret: {
    type: String,
    default: null,
  },

  twoFactorTempSecret: {
    type: String,
    default: null,
  },
})

export const Admin  = mongoose.model("Admin",adminSchema);
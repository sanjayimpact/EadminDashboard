import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check2step } from "../store/slice/globalSlice";
import { setlocalstorage } from "../utils/HelperFunctions/localstorage";
import { useCheckTwoStepQuery, useTwoStepCheckMutation, useTwoStepVerifyMutation } from "../store/slice/api/twostep";

const Settings = () => {
  const[enable2FA,{isSuccess,isError,error}] = useTwoStepVerifyMutation();
  const {data,isloading} = useCheckTwoStepQuery();

  const myinfo = useSelector((state) => state.auth.admindata);
  const my2step = useSelector((state)=>state.global.twostep);
  console.log(my2step);

  const[qrCode,setQrCode] = useState(null);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  
  const[verify2FA] = useTwoStepCheckMutation();



  const handleEnable2FA = async()=>{
    try{ 
      const response = await enable2FA();
     const{data} = response;
   if(data.status){
    setQrCode(data.data);
   }
    }catch(err){
      console.log(err);
    }
  }
  const handleVerifyOTP = async () => {
    console.log("Verifying OTP:", otp);
    try {
     let response =  await verify2FA({token:otp});
     console.log(response);
   
      setQrCode(null);
      setOtp("");
    } catch (err) {
      console.log(err);
    }
  };
 const  handletheme =(e)=>{
  const{value} = e.target;
  setlocalstorage("theme",value)
 
 }

useEffect(()=>{
  if(data?.isloading){
    return null
  }
  if(data?.status){
    dispatch(check2step(data?.twostep))
  }
},[data])


  
  return (
    <>
    <div className="space-y-8">

      {/* Page Title */}
     
      {/* Profile Settings */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Admin Name"
              value={myinfo.name}
              className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
                 value={myinfo.email}
              placeholder="admin@example.com"
              className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Security
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button disabled={my2step===true} onClick={handleEnable2FA} className="mt-4 text-sm text-indigo-600 hover:underline cursor-pointer">
          Enable Two-Factor Authentication {my2step? ' ✅ ' :''}
        </button>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Notifications
        </h2>

        <div className="space-y-4">
          {[
            "Email notifications",
            "SMS alerts",
            "Weekly reports",
            "System updates",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-sm text-gray-700">{item}</span>
              <input
                type="checkbox"
                className="h-5 w-5 text-indigo-600 rounded"
                defaultChecked
              />
            </label>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Language
            </label>
            <select className="mt-1 w-full rounded-lg border px-4 py-2 text-sm">
              <option>English</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Theme
            </label>
            <select onChange={handletheme} className="mt-1 w-full rounded-lg border px-4 py-2 text-sm">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value = "system">System</option>
            </select>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition">
          Save Changes
        </button>
      </div>

    </div>
  {qrCode && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={() => setQrCode(null)} // optional close
    />

    {/* Modal */}
    <div
      className="
        relative z-50 w-full max-w-md mx-4
        rounded-xl bg-white p-6
        shadow-xl
        transform transition-all duration-300 ease-out
        scale-100 opacity-100
        animate-modal-in
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Enable Two-Factor Authentication
        </h2>
        <button
          onClick={() => setQrCode(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <p className="text-sm text-gray-600 mb-4 text-center">
        Scan this QR code using Google Authenticator or Authy
      </p>

      <img
        src={qrCode}
        alt="2FA QR Code"
        className="h-40 w-40 mx-auto mb-4"
      />

      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />

      <button
        onClick={handleVerifyOTP}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-indigo-500 transition"
      >
        Verify & Enable 2FA
      </button>
    </div>
  </div>
)}

    </>
    
  );
};

export default Settings;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check2step } from "../store/slice/globalSlice";
import { setlocalstorage } from "../utils/HelperFunctions/localstorage";
import { useCheckTwoStepQuery, useTwoStepCheckMutation, useTwoStepVerifyMutation } from "../store/slice/api/twostep";

const Settings = () => {
 
  const myinfo = useSelector((state) => state.auth.admindata);



  const dispatch = useDispatch();




  //   try{ 
  //     const response = await enable2FA();
  //    const{data} = response;
  //  if(data.status){
  //   setQrCode(data.data);
  //  }
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  // const handleVerifyOTP = async () => {
  //   console.log("Verifying OTP:", otp);
  //   try {
  //    let response =  await verify2FA({token:otp});
  //    console.log(response);
   
  //     setQrCode(null);
  //     setOtp("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
 const  handletheme =(e)=>{
  const{value} = e.target;
  setlocalstorage("theme",value)
 
 }


  
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


    </>
    
  );
};

export default Settings;

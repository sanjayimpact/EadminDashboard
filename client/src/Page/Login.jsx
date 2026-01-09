import React from 'react'
import { loginvalidation } from '../utils/validations/loginvalidation'
import {useForm}  from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import withoutauth from '../Hoc/withoutauth'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slice/authslice'
import { setlocalstorage } from '../utils/HelperFunctions/localstorage'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../store/slice/api/userlogin'
const Login = () => {
    const{register,handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(loginvalidation)
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[adduser] = useLoginUserMutation();

    const onSubmit = async(formdata)=>{
 
      try{

          let response = await adduser(formdata);
         
         const{data} = response;
         if(data?.status){
          dispatch(setCredentials({token:data?.token,twostep:data?.twostep}));
          setlocalstorage('currentpath','dashboard');
         }
        
    

        }catch(err){
          console.log(err);
        }
    }
 
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-8">
        
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none transition"
              {...register('email')}
            />
            {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none transition"
              {...register('password')}
                
          />
          {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

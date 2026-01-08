import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { admindata, logout } from "../store/slice/authslice";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getlocalstorage, removelocalstorage, setlocalstorage } from "../utils/HelperFunctions/localstorage";
import { useEffect } from "react";
import { useGetMyInfoQuery, useLogoutUserMutation } from "../store/slice/api/userlogin";
const DashboardLayout = () => {
  const {data} = useGetMyInfoQuery();
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const myinfo = useSelector((state)=>state.auth.admindata);

  const [logoutuser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handlelogout = async () => {
    try {

      window.history.pushState(null, '', '/');
      window.history.replaceState(null, '', '/');
      removelocalstorage('currentpath');
      dispatch(logout());

      await logoutuser();


    } catch (err) {
      console.log(err);
    }
  }
  const currentpath = getlocalstorage('currentpath');
  const activetab = getlocalstorage('active');
  const handleroutes = (e) => {
    const route = e.target.innerText.toLowerCase();
    setlocalstorage('currentpath', route);
    setlocalstorage('active', route);
    switch (route) {
      case 'dashboard':

        navigate('/dashboard');
        break;
      case 'consumers':

        navigate('/consumers');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'products':
        navigate('/products');
        break;
      default:
        setlocalstorage('currentpath', 'dashboard');
        navigate('/dashboard');
        break;
    }

  }
useEffect(()=>{
     dispatch(admindata({name:data?.data.name,email:data?.data.email}));
},[data,dispatch])
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="px-6 py-4 text-lg font-semibold border-b border-slate-700">
          Admin Panel
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm cursor-pointer">
          <a onClick={handleroutes} className={`block rounded-lg px-4 py-2 ${activetab === 'dashboard' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            Dashboard
          </a>
          <a onClick={handleroutes} className="block rounded-lg px-4 py-2 hover:bg-slate-800">
            Products
          </a>
          <a onClick={handleroutes} className={`block rounded-lg px-4 py-2 ${activetab === 'consumers' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            Consumers
          </a>
          <a onClick={handleroutes} className={`block rounded-lg px-4 py-2 ${activetab === 'settings' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            Settings
          </a>
        </nav>

        {/* Logout (Sidebar - Mobile Friendly) */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handlelogout}
            className="cursor-pointer w-full rounded-lg bg-red-600 py-2 text-sm font-semibold hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              {currentpath ? currentpath.charAt(0).toUpperCase() + currentpath.slice(1) : 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-gray-600">
             {myinfo?.name}
            </span>

            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>

            {/* Logout (Desktop) */}
            <button
              onClick={handlelogout}
              className="cursor-pointer hidden md:inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}

        <main className="mt-7 p-3">
          <Outlet></Outlet>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;

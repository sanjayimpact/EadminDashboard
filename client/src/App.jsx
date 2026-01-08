import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGetMyInfoQuery, useRefreshTokenQuery } from './store/slice/apiSlice'
import { RouterProvider } from 'react-router-dom';
import { Router } from './Routes/routes';
import { setCredentials, setrefresh } from './store/slice/authslice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const{data,error} = useRefreshTokenQuery();
  

  const dispatch = useDispatch();





  
useEffect(()=>{

      if(error?.status==401){
      dispatch(setrefresh());
    }
    if(data?.status){
      dispatch(setCredentials(data?.token));
    }
    if(error?.status=="FETCH_ERROR"){
     dispatch(setrefresh());
    }
  },[data,dispatch,error])

  return (
    
     <RouterProvider router={Router} />
   
  )
}

export default App

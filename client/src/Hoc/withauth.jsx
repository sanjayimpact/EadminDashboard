import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const authwith = (WrappedComponent)=>{
    return (props)=>{
        
        const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
   
    if(isLoggedIn){
       return <Navigate to="/dashboard" replace/>;   
    }
    return <WrappedComponent {...props}/>;
 }

    
}

export default authwith
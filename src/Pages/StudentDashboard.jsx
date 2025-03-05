// import React, { useEffect , useState } from 'react';
// import { useSelector } from 'react-redux'; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// import { useDispatch } from 'react-redux';
// export default function StudentDashboard() {
//     const isAuth = useSelector(state => state?.isAuth);  
//     // const [user , setUser] = useState({})
//     const naviger = useNavigate() 
//     function getCookie(name) {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; ${name}=`);
//         if (parts.length === 2) return parts.pop().split(';').shift();
//     } 
//     const dispatch = useDispatch() ;
//     const logout = async ()=>{
//         await axios.post('http://localhost:8000/logout' , {} ,{
//           headers : {
//             accept : "application/json" , 
//             "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
//           } , 
//           withCredentials : true , 
//           withXSRFToken : true
//         }).then(()=>naviger("/login")) 
//         localStorage.removeItem("LOGIN_STATUS") 
//         localStorage.removeItem("USER_DATA") 
//         dispatch({type : "LOG_OUT"})
//     }
//     useEffect(() => {
//     isAuth === false && naviger("/login")    
//     }, [isAuth]);

//     return <div>
//         <h1>Student Dashbored</h1>
//         <button onClick={logout}>logout</button>
//     </div>;
// }

import React from 'react'
import StudentDashbored from '../components/StudentDashbored'
export default function StudentDashboard() {
  return (
    <><StudentDashbored/></>
  )
}

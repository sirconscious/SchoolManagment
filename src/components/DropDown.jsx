import React , {useState , useEffect} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function DropDown() { 
        const [user , setUser] = useState({})
        useEffect(()=>{ 
            axios.get('http://localhost:8000/api/user',{
                withCredentials : true
            })
            .then(response=>setUser(response.data))
        } , []) 

    //pour le logout 
    const naviger = useNavigate() 
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    } 
    const dispatch = useDispatch() ;
    const logout = async ()=>{
        await axios.post('http://localhost:8000/logout' , {} ,{
          headers : {
            accept : "application/json" , 
            "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
          } , 
          withCredentials : true , 
          withXSRFToken : true
        }).then(()=>naviger("/login")) 
        localStorage.removeItem("LOGIN_STATUS") 
        localStorage.removeItem("USER_DATA") 
        dispatch({type : "LOG_OUT"})
    }
  return ( 
    <>
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {user?.name ? user?.name : user?.firstname}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {user?.email}
        </span>
      </div>
      <ul className="py-2">
        <li>
          <Link
           to="/student/dashbored"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Settings
          </a>
        </li>
        <li>
          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" 
          onClick={logout}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </>
  );
}

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGIN_ACTION } from '../services/actions/actions'
export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({}) 
  const [info , setINfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const naviger = useNavigate()
  const dispatch = useDispatch() 
  const handleSubmit = async(e) => {
    e.preventDefault()
    const newErrors = {}
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // console.log({ email, password })
      await axios.get("http://localhost:8000/sanctum/csrf-cookie" , {
        withCredentials : true
      })  
      const data =   await axios.post("http://localhost:8000/login",{email : email , password : password},{
        headers : {
          accept : "application/json" , 
          "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
        } , 
        withCredentials : true , 
        withXSRFToken : true
      }).then(values=>{
        if (values.status <= 204) {
          setIsLoading(false)
          localStorage.setItem('LOGIN_STATUS' , "true")
          localStorage.setItem("USER_DATA" , JSON.stringify({email : email , password : password}))
          console.log("test")
          dispatch(LOGIN_ACTION({email: email , password : password}))
          naviger('/student/dashbored')
      }
      })
      .catch(err =>{
        setIsLoading(false)
        //  console.log(err.response.data.message)
         setINfo("Email or password is incorrect" );
        // alert(err.response.data.message);
      })
    }
  }
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
} 

  return (
    <div>
        

<form onSubmit={handleSubmit} class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <style jsx>{`
    input {
      width: 300px;
    }
  `}</style>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {errors.password && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}
  </div>
    {/* <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
    </div> */} 
    {info && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{info}</p>}
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
</form>

    </div>
  )
}


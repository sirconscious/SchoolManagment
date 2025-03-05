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
          const role = values.data.user.role
          console.log(role) 
          switch (role) {
            case "student":
              naviger("/student/dashbored")
              break;
            case "admin" : 
              naviger("/admin/dashbored") 
              break ;  
            case "teacher" :
              naviger('/teacher/dashbored')
              break ;
            default:
              break;
          }
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
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>{isLoading ? <>
<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
</>: "Submit"}</button>
</form>

    </div>
  )
}


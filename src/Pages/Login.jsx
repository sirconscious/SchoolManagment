import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function Login() { 
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking login status...");
    const loginStatus = localStorage.getItem("LOGIN_STATUS");
    if (loginStatus === "true") {
      console.log("Redirecting to /studentDashBord...");
      navigate("/student/dashbored", { replace: true });
    }
  }, [navigate]);
  

  return (
    <div className='w-full flex justify-center items-center h-[500px]'>
      <LoginForm />
    </div>
  );
}

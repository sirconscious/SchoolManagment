import React, { useState , useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux"; 
import { AuthSelector } from "../services/selectors/Selectors";
import { useDispatch } from "react-redux";
import { LOGOUT_ACTION } from "../services/actions/actions"; 
import DropDown from "./DropDown";
import axios from "axios";
export default function NavBar() {
    const isLogedIn = useSelector(AuthSelector);
    // console.log(isLogedIn)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    } 
    const naviger = useNavigate();
    const dispatch = useDispatch();
    const logout = async ()=>{
        await axios.post('http://localhost:8000/logout' , {} ,{
          headers : {
            accept : "application/json" , 
            "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
          } , 
          withCredentials : true , 
          withXSRFToken : true
        }).then(()=>{
            dispatch(LOGOUT_ACTION)
            naviger("/login")})
        // .catch(error =>{console.log(error)})
    }
    // const [isLogedIn, setIsLogedIn] = useState(true); 
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                    </span>
                </a>

                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {/* Profile button */}
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="sr-only">Open user menu</span>
                        {isLogedIn ? (
                            <FaRegUser className="w-8 h-8 rounded-full bg-gray-800 p-1 text-white" />
                        ) : (
                            <Link to="/login">
                                <FaRegUser className="w-8 h-8 rounded-full bg-gray-800 p-1 text-white" />
                            </Link>
                        )}
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="z-50 absolute right-4 top-14 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                            {isLogedIn && (
                              <DropDown  />
                            )}
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-user"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                to="/"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/login"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/services"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/pricing"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

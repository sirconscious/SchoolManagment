import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import TeacherSideBar from "../components/TeacherSideBar";
export default function TeacherLayout() {
  return (
    <>
      <div className=" fixed right-0 w-full">
        <NavBar />
      </div>

      <TeacherSideBar />
      <Outlet />
    </>
  );
}

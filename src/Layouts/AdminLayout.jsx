import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBr from "../components/AdminSideBr";
import NavBar from "../components/NavBar";
export default function AdminLayout() {
  return (
    <>
      <div className=" fixed right-0 w-full">
        <NavBar />
      </div>

      <AdminSideBr />
      <Outlet />
    </>
  );
}

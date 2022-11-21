import React from "react";
import { MdAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
const Add = () => {
  return (
    <div className="px-4 h-[calc(100vh-60px)] mt-2 overflow-auto">
  
    <div className="flex item-center">
      <NavLink
        className="mx-2  py-1 px-10 text-gray-500 outline-none border-b-[2px] border-slate-300 text-base  font-semibold focus:text-yellow-400  focus:border-b-[2px] focus:border-yellow-400 "
        to="subject"
      >
        Add Subject
      </NavLink>
      <NavLink
        className="mx-4  py-1 px-10 text-gray-500 outline-none border-b-[2px] border-slate-300 text-base font-semibold focus:text-yellow-400  focus:border-b-[2px] focus:border-yellow-400 "
        to="user"
      >
       Add User
      </NavLink>
    </div>
    <hr
      className="border-[2px] border-t-0 border-slate-300 rounded-md"
      style={{ marginTop: "-2px" }}
    />
    <Outlet />
  </div>
  )
}

export default Add
import React from "react";
import { MdAdd } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
function ExaminerDashboardContent() {
  const location = useLocation();
  return (
    <div className="px-4">
      <div className="flex justify-between items-center   pt-4 ">
        <div className="font-bold text-xl">Dashboard</div>

        <NavLink
          to={
            location.pathname === "/examiner/dashboard/topics"
              ? "/examiner/add/topic"
              : "/examiner/add/questionBank"
          }
        >
          <MdAdd
            className="bg-yellow-400 rounded-full text-white p-[3px] shadow-md cursor-pointer"
            size={36}
          />
        </NavLink>
      </div>
      <div className="flex item-center">
        <NavLink
          className="mx-2  py-1 px-10 text-gray-500 outline-none border-b-[2px] border-slate-300 text-base  font-semibold focus:text-yellow-400  focus:border-b-[2px] focus:border-yellow-400 "
          to="topics"
        >
          Topics
        </NavLink>
        <NavLink
          className="mx-4  py-1 px-10 text-gray-500 outline-none border-b-[2px] border-slate-300 text-base font-semibold focus:text-yellow-400  focus:border-b-[2px] focus:border-yellow-400 "
          to="questionBank"
        >
          Question Bank
        </NavLink>
      </div>
      <hr
        className="border-[2px] border-t-0 border-slate-300 rounded-md"
        style={{ marginTop: "-2px" }}
      />

      <div className="h-[calc(100vh-140px)] w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default ExaminerDashboardContent;

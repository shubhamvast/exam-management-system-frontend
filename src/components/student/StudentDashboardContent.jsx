import React from "react";
import { MdAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

function StudentDashboardContent() {
  return (
    <div className="px-4 h-full">
      <div className="flex justify-between items-center   py-3 ">
        <div className="font-bold text-xl">Dashboard</div>
      </div>
      <div className="flex item-center"></div>
      <hr
        className="border-[2px] border-t-0 border-slate-300 rounded-md"
        style={{ marginTop: "-2px" }}
      />
      {/* <div className="h-10 w-full bg-[#172337] text-slate-300 flex items-center justify-between pl-4 pr-24">
        <span>Test Questions</span>
        <span>Select answer</span>
      </div> */}
      <div className=" h-[calc(100vh-160px)] ">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboardContent;

import React from "react";
import { MdAdd } from "react-icons/md";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
function DashboardContent() {
  const location = useLocation();
  const pathname = location.pathname;

  //dashboard content strip
  return (
    <div className="px-4 h-[calc(100vh-60px)] w-full">
      <div className="flex justify-between items-center   pt-4 ">
        <div className="font-bold text-xl">Dashboard</div>
        <NavLink
          to={
            pathname == "/admin/dashboard/subjects"
              ? "/admin/add/subject"
              : "/admin/add/user"
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
          to="/admin/dashboard/subjects"
        >
          Subjects
        </NavLink>
        <NavLink
          className="mx-4  py-1 px-10 text-gray-500 outline-none border-b-[2px] border-slate-300 text-base font-semibold focus:text-yellow-400  focus:border-b-[2px] focus:border-yellow-400 "
          to="/admin/dashboard/users"
        >
          Users
        </NavLink>
      </div>
      <hr
        className="border-[2px] border-t-0 border-slate-300 rounded-md"
        style={{ marginTop: "-2px" }}
      />
      <div className="h-[calc(100vh-150px)] overflow-auto w-full ">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardContent;

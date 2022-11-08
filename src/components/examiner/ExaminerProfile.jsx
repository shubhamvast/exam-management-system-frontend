import React, { useEffect, useState } from "react";
import { BsPen } from "react-icons/bs";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdNotifications, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../../actions/loginAction";
import jwt_decode from "jwt-decode";
import printText from "../../commonMethods/printText";
const ExaminerProfile = (props) => {
  const { profilePic, setShowProfileOptions, user } = props;
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <div className=" my-1  flex items-center justify-between ">
        <div className="h-14 w-14 mx-2  rounded-full  overflow-hidden  ">
          <img src={profilePic} alt="profilePic" srcSet="" />
        </div>

        <div className="h-full w-2/3 flex flex-col justify-center">
          <h4 className="w-full  whitespace-normal">
            {printText(user.firstName + " " + user.lastName)}
          </h4>
          <p className="text-sm font-semibold">{printText(user.role)}</p>
        </div>
      </div>
      <hr className="h-1 bg-red-500" />
      <div className="w-4/5 mx-auto mt-2 flex flex-col">
        <NavLink
          className="px-2 py-3 flex cursor-pointer hover:bg-slate-200 rounded"
          onClick={() => {
            setShowProfileOptions(false);
          }}
          to="/examiner/changePassword"
        >
          <BsPen size={25} />
          <span className="ml-3">Change Password</span>
        </NavLink>
        <NavLink
          className="px-2 py-3 flex  cursor-pointer hover:bg-slate-200 rounded"
          onClick={() => {
            setShowProfileOptions(false);
          }}
          to="/examiner/changeProfile"
        >
          <HiWrenchScrewdriver size={25} />
          <span className="ml-3">Edit Profile</span>
        </NavLink>
        <NavLink className="px-2 py-3 flex cursor-pointer hover:bg-slate-200 rounded">
          <MdNotifications size={25} />
          <span className="ml-3">Notifications</span>
        </NavLink>
        <NavLink
          className="px-2 py-3 flex cursor-pointer hover:bg-slate-200 rounded"
          onClick={handleLogOut}
        >
          <MdLogout size={25} />
          <span className="ml-3">Logout</span>
        </NavLink>
      </div>
    </>
  );
};

export default ExaminerProfile;

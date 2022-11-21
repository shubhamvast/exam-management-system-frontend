import React, { useEffect, useState } from "react";
import { NavLink, NavNavLink, Outlet } from "react-router-dom";
import profilePic from "../../assets/image/profile girl.jpg";
import { IoClose } from "react-icons/io5";
import AdminProfile from "../admin/AdminProfile";
import emsIcon from "../../assets/image/ems icon.png";
import { MdDashboard } from "react-icons/md";
import PaperSetterProfile from "./PaperSetterProfile";
import jwt_decode from "jwt-decode";
import printText from "../../commonMethods/printText";
import { getCurrentUser } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";


export const PaperSetterDashboard = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.loginReducer.token);
  const user = useSelector((state) => state.userReducer.currentUser);

  const [decode, setDecode] = useState("");
  
  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);
      setDecode(decode);
      dispatch(getCurrentUser(decode._id));
    }
  }, []);

  useEffect(() => {   
      dispatch(getCurrentUser(decode._id));
  }, [showProfileOptions]);


  return (
    <div className="h-screen w-[95%] mx-auto flex rounded-lg overflow-hidden">
      <div className="h-full  bg-[#172337] " style={{ flex: "1" }}>
        <div className="my-2">
          <img className="w-full" src={emsIcon} />
        </div>
        <div>
          <NavLink
            className="bg-[#FFD630] flex mx-2 p-1"
            to="dashboard/papers"
          >
            <MdDashboard size={25} />
            <span className="ml-2">Dashboard</span>
          </NavLink>
        </div>
      </div>
      <div style={{ flex: "5" }} className="">
        <nav className="bg-zinc-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
          <div className="container flex flex-wrap justify-end items-center mx-auto relative">
         
          <div className="flex items-end">
              <div className= {`${
                    !showProfileOptions ? "block" : "hidden"
                  } cursor-default flex flex-col items-end mr-1`}>
                <span className="text-sm">
                  {printText(user.firstName + " " + user.lastName)}
                </span>
                <p className="text-xs font-semibold">{printText(user.role)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-cover bg-center overflow-hidden  ">
                <img
                  src={profilePic}
                  alt="profilePic"
                  srcSet=""
                  className={`${
                    !showProfileOptions ? "block" : "hidden"
                  } cursor-pointer`}
                  onClick={() => setShowProfileOptions(true)}
                />
                <div
                  className={`bg-white absolute top-[20px] right-0 h-80 w-60  flex flex-col shadow-lg rounded-md  overflow-hidden ${
                    showProfileOptions ? "block" : "hidden"
                  }`}
                >
                  <div className="flex justify-end">
                    <IoClose
                      className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-100"
                      onClick={() => setShowProfileOptions(false)}
                      size={35}
                    />
                  </div>
                  <PaperSetterProfile
                    profilePic={profilePic}
                    user={user}
                    setShowProfileOptions={setShowProfileOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

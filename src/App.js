import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LoginDashbord } from "./components/admin/AdminDashbord";
import { ExaminerDashboard } from "./components/examiner/ExaminerDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadLogin } from "./actions/loginAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlineEmail } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";

function App() {
  const token = useSelector((state) => state.loginReducer.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, [token]);

  //if token present we check role and navigate accordingly
  return (
    <div className="h-screen">
      {token ? (
        <Outlet />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <div className="h-40 w-full flex justify-around bg-slate-200">
            <div className="h-full w-1/4  flex justify-center items-center">
              <Link
                className=""
                to="#"
                onClick={(e) => {
                  window.location.href = "https://www.valueaddsofttech.com/";
                  e.preventDefault();
                }}
              >
                <img
                  src="https://www.valueaddsofttech.com/images/vast-logo1.png"
                  className="rounded-md"
                />
              </Link>
            </div>
            <div className="h-full w-1/4 flex flex-col justify-center  items-center">
              <h3 className="text-lg mb-3">Important Links</h3>
              <Link className="mb-2 text-blue-400" to="/">
                Home
              </Link>
              <Link className="mb-2 text-blue-400" to="/login">
                LogIn
              </Link>
              <Link className="mb-2 text-blue-400" to="/register">
                Register
              </Link>
            </div>
            <div className="h-full w-1/4  flex flex-col justify-center  items-center">
              <h3 className="text-lg mb-3">Contact Us</h3>
              <Link
                className="text-blue-400 flex items-center justify-around"
                to="#"
                onClick={(e) => {
                  window.location.href = "mailto:shubhamm@valueaddsofttech.com";
                  e.preventDefault();
                }}
              >
                <MdOutlineEmail size={25} className="text-slate-700 mr-2" />
                shubhamm@valueaddsofttech.com
              </Link>
              <Link
                className="text-blue-400 flex justify-around items-center"
                target="_blank"
                to="#"
                onClick={(e) => {
                  window.location.href =
                    "https://www.instagram.com/_shubham_mangore";
                  e.preventDefault();
                }}
              >
                <BsInstagram size={20} className="text-slate-700 mr-2" />
                _shubham_mangore
              </Link>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;

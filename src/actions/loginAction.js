import axios from "axios";
import * as actions from "./actionTypes";
import { toast } from "react-toastify";
const apiEndPoint = process.env.REACT_APP_API_URL + "login";


//login code
export const loginAction = (data) => (dispatch) => {

  //message if login failed
  const loginFailed = (message) =>
    toast.warn(message, {
      position: "top-center",
      theme: "dark",
    });

  //message if login successful
  const loginSucceful = (message) => {
    toast.success(message, {
      position: "top-center",
      theme: "light",
      autoClose: 2000,
    });
  };


  axios
    .post(apiEndPoint, data)
    .then((response) => {
      loginSucceful("Login successfully!");
      sessionStorage.setItem("token", response.data);
      dispatch({
        type: actions.LOGIN_USER,
        payload: response.data,
      });
    })
    .catch((err) => {
      loginFailed("Enter valid credentials!");
    });
};


//set token 
export const loadLogin = () => {
  return {
    type: actions.LOGIN_USER,
    payload: sessionStorage.getItem("token"),
  };
};

//logout code 
export const logOutUser = () => {
  const logOut = (message) =>
    toast.success(message, {
      position: "top-center",
      theme: "dark",
      autoClose: 2000,

    });
  logOut("Log out successfully!");
  sessionStorage.setItem("token", "");
  return {
    type: actions.LOG_OUT_USER,
  };
};

import axios from "axios";
import * as actions from "./actionTypes";
import { toast } from "react-toastify";
const apiEndPoint = process.env.REACT_APP_API_URL + "login";


//login code
export const loginAction = (data) => (dispatch) => {

  //message if login failed
  const loginFailed = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose:1000
    });

 


  axios
    .post(apiEndPoint, data)
    .then((response) => {
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
  sessionStorage.setItem("token", "");
  return {
    type: actions.LOG_OUT_USER,
  };
};

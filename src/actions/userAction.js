import axios from "axios";
import * as actions from "./actionTypes";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const getAllUsers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_USERS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const registerStudent = (student) => (dispatch) => {
  const registrestionFailed = (message) =>
    toast.warn(message, {
      position: "top-center",
      theme: "dark",
    });
  student["role"] = "student";
  axios
    .post(apiEndPoint, student)
    .then((response) =>
      dispatch({
        type: actions.ADD_USER,
        payload: response.data,
      })
    )
    .catch((err) => {
      registrestionFailed("Username must be unique");
    });
};

export const getCurrentUser = (id) => (dispatch) => {
  axios.get(apiEndPoint + "/" + id).then((response) => {
    dispatch({
      type: actions.GET_CURRENT_USER,
      payload: response.data,
    });
  });
};

export const getAllStudents = () => (dispatch) => {
  axios
    .get(apiEndPoint + "/" + "getAllStudents")
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_STUDENTS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const addUser = (user) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, user, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.ADD_USER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};

export const changePassword = (user) => (dispatch, getState) => {
  axios
    .patch(
      apiEndPoint + "/" + user.id,
      {
        password: user.password,
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      dispatch({
        type: actions.CHANGE_PASSWORD,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};


export const editProfile = (user) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint + "/editProfile" ,
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        id:user.id
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      dispatch({
        type: actions.EDIT_PROFILE,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};


export const updateUser = (user) => (dispatch, getState) => {
  axios
    .put(
      apiEndPoint + "/" + user._id,
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      dispatch({
        type: actions.UPDATE_USER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};


export const softDeleteUser = (user) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint + "/softDeleteUser",
     user,
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      dispatch({
        type: actions.SOFT_DELETE_USER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};





export const deleteUser = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({
        type: actions.DELETE_USER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

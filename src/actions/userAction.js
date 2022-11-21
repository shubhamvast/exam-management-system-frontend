import axios from "axios";
import * as actions from "./actionTypes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "./loginAction";

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

  const registrestionSuccessfull = (message) =>
    toast.success(message, {
      position: "top-center",
      theme: "light",
    });

  student["role"] = "student";
  axios
    .post(apiEndPoint, student)
    .then((response) => {
      registrestionSuccessfull("Registered successfully...!");
      dispatch({
        type: actions.ADD_USER,
        payload: response.data,
      });
    })
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
    .then((response) => {
      toast.success("User added successfully...", {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch({
        type: actions.ADD_USER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const changePassword = (user) => (dispatch, getState) => {
  const passwordNotChanged = (message) => {
    toast.error(message, {
      position: "top-center",
      theme: "light",
      autoClose: 1000,
    });
  };

  const passwordChanged = (message) => {
    toast.success(message, {
      position: "top-center",
      theme: "light",
      autoClose: 1000,
    });
  };

  axios
    .patch(apiEndPoint + "/" + user.id, user, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      passwordChanged("Password changed successfully!");
      dispatch({
        type: actions.CHANGE_PASSWORD,
        payload: response.data,
      });
      dispatch(logOutUser());
    })
    .catch((error) => {
      passwordNotChanged(error.response.data);
    });
};

export const editProfile = (user) => (dispatch, getState) => {
  const profileEditedSuccessfully = (message) => {
    toast.success(message, {
      position: "top-center",
      theme: "light",
      autoClose: 1000,
    });
  };

  axios
    .post(
      apiEndPoint + "/editProfile",
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        id: user.id,
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      profileEditedSuccessfully("Profiel Upadated Successfully....");
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
      toast.success("User updated successfully...", {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch({
        type: actions.UPDATE_USER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

export const softDeleteUser = (user) => (dispatch, getState) => {
  if (user.operation === "Active") {
    if (!window.confirm("Are you sure to Inactive User?")) return;
  } else {
    if (!window.confirm("Are you sure to Active User?")) return;
  }
  axios
    .post(
      apiEndPoint + "/softDeleteUser",
      { userId: user.userId },
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
  if (!window.confirm("Are you sure to Delete user?")) return;

  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      toast.success("User deleted successfully...!", {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch({
        type: actions.DELETE_USER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

export const forgotPassword = (data) => (dispatch) => {
  toast
    .promise(axios.post(apiEndPoint + "/forgotPassword", data), {
      pending: "Processing Forgot Password request",

      success:
        "An email with reset password link is sent to you on your email Id",
    })
    .then((response) => {
      setTimeout(() => {
        window.location.href = "http://localhost:3000/";
      }, 4000);
    })
    .catch((error) => toast.error(error.response.data));
};

export const resetPassword = (data) => (dispatch) => {
  toast
    .promise(axios.post(apiEndPoint + "/resetPassword", data), {
      pending: "Processing Reset Password request",

      success: "Password reset successfully..!",
    })
    .then((response) => {
      setTimeout(() => {
        window.location.href = "http://localhost:3000/";
      }, 4000);
    })
    .catch((error) => {
      toast.error(error.response.data);
    });
};

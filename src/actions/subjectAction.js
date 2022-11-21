import axios from "axios";
import * as actions from "./actionTypes";
import { toast } from "react-toastify";
const apiEndPoint = process.env.REACT_APP_API_URL + "subjects";

export const getAllSubjects = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_SUBJECTS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const getCurrentSubject = (id) => (dispatch) => {
  axios.get(apiEndPoint + "/" + id).then((response) => {
    dispatch({
      type: actions.GET_CURRENT_SUBJECT,
      payload: response.data,
    });
  });
};

export const addSubject = (subject) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, subject, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      toast.success("Subject added successfully...", {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch({
        type: actions.ADD_SUBJECT,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const updateSubject = (subject) => (dispatch, getState) => {
  axios
    .put(
      apiEndPoint + "/" + subject._id,
      { name: subject.name },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      toast.success("Subject Updated successfully...", {
        autoClose: 1000,
        position: "top-center",
      });

      dispatch({
        type: actions.UPDATE_SUBJECT,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

export const deleteSubject = (id) => (dispatch, getState) => {
  const result = window.confirm("Are you sure to Delete ? ");
  if (!result) return;

  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      toast.success("Subject Deleted successfully...", {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch({
        type: actions.DELETE_SUBJECT,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

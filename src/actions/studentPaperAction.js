import axios from "axios";
import { useDispatch } from "react-redux";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"studentPapers";

export const getAllStudentPapers = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_STUDENT_PAPERS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}



export const getStudentPapersByStudent = (studentId) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/byStudent", {studentId}, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.GET_STUDENT_PAPERS_BYSTUDENTS,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};

//RESULT
export const result = (studentId) => (dispatch, getState) => {
  axios
    .post(apiEndPoint+"/result", {studentId}, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.GET_RESULT_BYSTUDENT,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};




export const getCurrentStudentPaper = (id) => (dispatch) => {
  axios.get(apiEndPoint + "/" + id).then((response) => {
    dispatch({
      type: actions.GET_CURRENT_STUDENT_PAPER,
      payload: response.data,
    });
  });
};


export const addStudentPaper = (studentPaper) => (dispatch, getState) => {
    axios
      .post(apiEndPoint, studentPaper, {
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) =>
        dispatch({
          type: actions.ADD_STUDENT_PAPER,
          payload:response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };


  export const updateStudentPaper = (studentPaper) => (dispatch,getState) => {
    axios
      .put(apiEndPoint + "/" + studentPaper._id, {
        student:studentPaper.student,
        paper:studentPaper.paper     
      },{
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) => {
        dispatch({
          type: actions.UPDATE_STUDENT_PAPER,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.message));
  };
  

  export const deleteStudentPaper = (id) => (dispatch,getState)=>{
    axios.delete(apiEndPoint+"/"+id,{
      headers:{"x-auth-token":getState().loginReducer.token}
    }).then((response)=>{
      dispatch({
        type:actions.DELETE_STUDENT_PAPER,
        payload:response.data,
      })
    }).catch((error)=>console.log(error.message))
  }


    


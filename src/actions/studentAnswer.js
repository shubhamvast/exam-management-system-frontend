import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"studentAnswers";

export const getAllStudentAnswers = ()=>(dispatch)=>{
    axios.get(apiEndPoint).then((response)=>{
        dispatch({
            type:actions.GET_ALL_STUDENT_ANSWERS,
            payload:response.data
        })
    }).catch((err)=>console.log(err.message))
}


export const getStudentAnswersBystudentAndPaper = (studentAnswer) => (dispatch, getState) => {
  axios
    .post(apiEndPoint+"/byStudentAndPaper", studentAnswer, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.GET_STUDENT_ANSWERS_STUDENTANDPAPER,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};






export const getCurrentStudentAnswer = (id) => (dispatch) => {
    axios.get(apiEndPoint + "/" + id).then((response) => {
      dispatch({
        type: actions.GET_CURRENT_STUDENT_ANSWER,
        payload: response.data,
      });
    });
  };
  

  export const addStudentAnswer = (studentAnswer) => (dispatch, getState) => {
    axios
      .post(apiEndPoint, studentAnswer, {
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) =>
        dispatch({
          type: actions.ADD_STUDENT_ANSWER,
          payload:response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };


  
  export const updateStudentAnswer = (studentAnswer) => (dispatch,getState) => {
    axios
      .put(apiEndPoint + "/" + studentAnswer._id, {
        student:studentAnswer.student,
        paperQuestion:studentAnswer.paperQuestion     
      },{
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) => {
        dispatch({
          type: actions.UPDATE_STUDENT_ANSWER,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.message));
  };
  

  export const deleteStudentAnswer = (id) => (dispatch,getState)=>{
    axios.delete(apiEndPoint+"/"+id,{
      headers:{"x-auth-token":getState().loginReducer.token}
    }).then((response)=>{
      dispatch({
        type:actions.DELETE_STUDENT_ANSWER,
        payload:response.data,
      })
    }).catch((error)=>console.log(error.message))
  }



  
  export const clearStudentAnswer = () => (dispatch,getState)=>{
    axios.delete(apiEndPoint,{
      headers:{"x-auth-token":getState().loginReducer.token}
    }).then((response)=>{
      dispatch({
        type:actions.CLEAR_STUDENT_ANSWERS,
        payload:response.data,
      })
    }).catch((error)=>console.log(error.message))
  }
import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"paperQuestions";

export const getAllPaperQuestions = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_PAPER_QUESTIONS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}


export const getPaperQuestionsByPaper = (paper) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/byPaper", {paper}, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.GET_PAPER_QUESTIONS_BYPAPER,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};





export const addPaperQuestion = (paperQuestion) => (dispatch, getState) => {
    axios
      .post(apiEndPoint, paperQuestion, {
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) =>
        dispatch({
          type: actions.ADD_PAPER_QUESTION,
          payload:response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };
  

  export const deletePaperQuestion = (id) => (dispatch,getState)=>{
    axios.delete(apiEndPoint+"/"+id,{
      headers:{"x-auth-token":getState().loginReducer.token}
    }).then((response)=>{
      dispatch({
        type:actions.DELETE_PAPER_QUESTION,
        payload:response.data,
      })
    }).catch((error)=>console.log(error.message))
  }


  export const clearPaperQuestions = () =>(dispatch)=>{
      dispatch({
        type:actions.CLEAR_PAPER_QUESTIONS,
        payload:[]
      })
  }


 
export const examQuestions = (studentId) => (dispatch, getState) => {
  axios
    .post(apiEndPoint+"/examQuestions", {studentId}, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.EXAM_QUESTIONNS,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};

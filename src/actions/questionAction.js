import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"questions";

export const getAllQuestions = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_QUESTIONS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}

export const getCurrentQuestion = (id)=>(dispatch)=>{
  axios.get(apiEndPoint+"/"+id).then((response)=>{
      dispatch({
          type:actions.GET_CURRENT_QUESTION,
          payload:response.data
      })
  })
}

export const getQuestionBySubject = (paper) => (dispatch, getState) => {
  axios
    .post(apiEndPoint+"/bySubject", {paper}, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      {
        dispatch({
        type: actions.GET_QUESTIONS_BY_SUBJECT,
        payload:response.data,
      })}
    )
    .catch((err) => console.log(err.message));
};



export const filterQuestions = (filter) => (dispatch, getState) => {
  axios
    .post(apiEndPoint+"/filterQuestions", filter, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      {
        dispatch({
        type: actions.FILTER_QUESTIONS,
        payload:response.data,
      })}
    )
    .catch((err) => console.log(err.message));
};






export const addQuestion = (question) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, question, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.ADD_QUESTION,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};



export const updateQuestion = (question) => (dispatch,getState) => {
  axios
    .put(apiEndPoint + "/" + question._id, {
      answer:question.answer,
    complexityLevel: question.complexityLevel,
    marks: question.marks,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,
    questionText:question.questionText,
    topic: question.topic,
    },{
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({
        type: actions.UPDATE_QUESTION,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

export const activeQuestion=(id) => (dispatch,getState) => {
  axios
    .patch(apiEndPoint + "/" + id, {
     
    },{
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({
        type: actions.ACTIVE_QUESTION,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));

}


export const deleteQuestion = (id) => (dispatch,getState)=>{
  axios.delete(apiEndPoint+"/"+id,{
    headers:{"x-auth-token":getState().loginReducer.token}
  }).then((response)=>{
    dispatch({
      type:actions.DELETE_QUESTION,
      payload:response.data,
    })
  }).catch((error)=>console.log(error.message))
}
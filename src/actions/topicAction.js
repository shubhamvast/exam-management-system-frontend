import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"topics";

export const getAllTopics = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_TOPICS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}

export const getTopicsByQuestionId = (questionId) =>(dispatch,getState) =>{
  axios
  .post(apiEndPoint + "/byQuestionId", questionId, {
    headers: { "x-auth-token": getState().loginReducer.token },
  })
  .then((response) =>
    dispatch({
      type: actions.GET_TOPICS_BYQUESTIONID,
      payload:response.data,
    })
  )
  .catch((err) => console.log(err.message));
}



export const getTopicsBySubject = (subjectId) =>(dispatch,getState) =>{
  axios
  .post(apiEndPoint + "/bySubjectId", {subjectId}, {
    headers: { "x-auth-token": getState().loginReducer.token },
  })
  .then((response) =>
    dispatch({
      type: actions.GET_TOPICS_BYSUBJECT,
      payload:response.data,
    })
  )
  .catch((err) => console.log(err.message));
}




export const getCurrentTopic = (id)=>(dispatch)=>{
    axios.get(apiEndPoint+"/"+id).then((response)=>{
        dispatch({
            type:actions.GET_CURRENT_TOPIC,
            payload:response.data
        })
    })

}

export const addTopic = (topic) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, topic, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.ADD_TOPIC,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};


export const updateTopic = (topic) => (dispatch,getState) => {
    axios
      .put(apiEndPoint + "/" + topic._id, {
        name:topic.name,
        subject:topic.subject     
      },{
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) => {
        dispatch({
          type: actions.UPDATE_TOPIC,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.message));
  };

  export const deleteTopic = (id) => (dispatch,getState)=>{
    axios.delete(apiEndPoint+"/"+id,{
      headers:{"x-auth-token":getState().loginReducer.token}
    }).then((response)=>{
      dispatch({
        type:actions.DELETE_TOPIC,
        payload:response.data,
      })
    }).catch((error)=>console.log(error.message))
  }

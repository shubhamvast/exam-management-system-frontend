import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"answerOptions";

export const getAllAnswerOptions = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_ANSWEROPTIONS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}

export const getAnswerOptionsById = (questionId) => (dispatch,getState) =>{
    axios
    .post(apiEndPoint + "/byQuestionId", {questionId}, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.GET_ANSWEROPTIONS_BYQUESTIONID,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
  }
  
  
import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"papers";

export const getAllPapers = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_PAPERS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}


export const getCurrentPaper = (id)=>(dispatch)=>{
  axios.get(apiEndPoint+"/"+id).then((response)=>{
      dispatch({
          type:actions.GET_CURRENT_PAPER,
          payload:response.data
      })
  })

}



export const addPaper = (paper) => (dispatch, getState) => {
    axios
      .post(apiEndPoint, paper, {
        headers: { "x-auth-token": getState().loginReducer.token },
      })
      .then((response) =>
        dispatch({
          type: actions.ADD_PAPER,
          payload:response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };

  
export const updatePaper = (paper) => (dispatch,getState) => {
  axios
    .put(apiEndPoint + "/" + paper._id, {
      name:paper.name,
      subject:paper.subject     
    },{
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({
        type: actions.UPDATE_PAPER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

export const deletePaper = (id) => (dispatch,getState)=>{
  axios.delete(apiEndPoint+"/"+id,{
    headers:{"x-auth-token":getState().loginReducer.token}
  }).then((response)=>{
    dispatch({
      type:actions.DELETE_PAPER,
      payload:response.data,
    })
  }).catch((error)=>console.log(error.message))
}

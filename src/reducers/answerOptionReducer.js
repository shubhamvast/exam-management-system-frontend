import * as actions from "../actions/actionTypes";

export const answerOptionReducer = (
  state = { answerOptions: []},
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_ANSWEROPTIONS: {
      return {
        ...state,
        answerOptions: [...action.payload],
      };
    }
  
    case actions.GET_ANSWEROPTIONS_BYQUESTIONID: {
      return {
        ...state,
        answerOptions: [...action.payload],
      };
    }
 
    default:
      return state;
  }
};

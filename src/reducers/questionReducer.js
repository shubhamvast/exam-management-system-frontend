import * as actions from "../actions/actionTypes";

export const questionReducer = (state = {questions:[],currentQuestion:""},action)=>{
    
    switch (action.type) {
        case actions.GET_ALL_QUESTIONS:{
            return{
                ...state,
                questions:[...action.payload],
            }
        }       
        case actions.GET_CURRENT_QUESTION:{
           
                return{
                    ...state,
                    currentQuestion:action.payload
                }
        }

        case actions.ACTIVE_QUESTION:{

            const ele = state.questions.filter((question) => question._id === action.payload._id);
            const index = state.questions.indexOf(ele[0]);
            state.questions[index] = action.payload;
            return {
              ...state,
      
              questions: [...state.questions],
            };
        }

        case actions.GET_QUESTIONS_BY_SUBJECT:{
            return{
                ...state,
                questions:[...action.payload],
            }
        }

        case actions.FILTER_QUESTIONS:{
            return{
                ...state,
                questions:[...action.payload],
            }
        }

        case actions.ADD_QUESTION:{
            state.questions.push(action.payload);
            return{
                ...state,
                questions:[...state.questions]

            }
        }
        case actions.UPDATE_QUESTION:{
            const ele = state.questions.filter((question) => question._id === action.payload._id);
            const index = state.questions.indexOf(ele[0]);
            state.questions[index] = action.payload;
            return {
              ...state,
      
              questions: [...state.questions],
            };
        }
    
        case actions.DELETE_QUESTION: {
            const newState = state.questions.filter(
              (ele) => ele._id !== action.payload._id
            );
            return {
              ...state,
      
              questions: newState,
            };
          }    
            
        default: return state;
    }
}
import * as actions from "../actions/actionTypes";

export const paperQuestionReducer = (state = {paperQuestions:[]},action)=>{
    
    switch (action.type) {
        case actions.GET_ALL_PAPER_QUESTIONS:{
            return{
                ...state,
                paperQuestions:[...action.payload],
            }
        }       

        case actions.GET_PAPER_QUESTIONS_BYPAPER:{
            return{
                ...state,
                paperQuestions:[...action.payload],
            }
        }   

        case actions.EXAM_QUESTIONNS:{
            return{
                ...state,
                paperQuestions:[...action.payload],
            }
        }
            
        
        case actions.ADD_PAPER_QUESTION:{
            state.paperQuestions.push(action.payload);
            return{
                ...state,
                paperQuestions:[...state.paperQuestions]

            }
        }

        case actions.DELETE_PAPER_QUESTION: {
            const newState = state.paperQuestions.filter(
              (ele) => ele._id !== action.payload._id
            );
            return {
              ...state,
      
              paperQuestions: newState,
            };
          }    

        case actions.CLEAR_PAPER_QUESTIONS:{
            return{
                ...state,
                paperQuestions:action.payload
            }
        }


        default: return state;
    }
}
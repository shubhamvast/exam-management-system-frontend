import * as actions from "../actions/actionTypes";

export const studentAnswerReducer = (state = {studentAnswers:[], currentStudentAnswer: ""},action)=>{
    
    switch (action.type) {
        case actions.GET_ALL_STUDENT_ANSWERS:{
            return{
                ...state,
                studentAnswers:[...action.payload],
            }
        }    
        
        case actions.GET_STUDENT_ANSWERS_STUDENTANDPAPER:{
          return{
              ...state,
              studentAnswers:[...action.payload],
          }
      }    

        case actions.GET_CURRENT_STUDENT_ANSWER: {
          return {
            ...state,
            currentStudentAnswer: action.payload,
          };
        }
           
        
        case actions.ADD_STUDENT_ANSWER: {
            state.studentAnswers.push(action.payload);
            return {
              ...state,
              studentAnswers: [...state.studentAnswers],
            };
          }
      
          case actions.UPDATE_STUDENT_ANSWER: {
            const ele = state.studentAnswers.filter(
              (studentPaper) => studentPaper._id === action.payload._id
            );
            const index = state.studentAnswers.indexOf(ele[0]);
            state.studentAnswers[index] = action.payload;
            return {
              ...state,
      
              studentAnswers: [...state.studentAnswers],
            };
          }
      
          case actions.DELETE_STUDENT_ANSWER: {
            const newState = state.studentAnswers.filter(
              (ele) => ele._id !== action.payload._id
            );
            return {
              ...state,
      
              studentAnswers: newState,
            };

           

          }
      
          case actions.CLEAR_STUDENT_ANSWERS: {
            
            return {
              ...state,
              studentAnswers: action.payload,
            };

          }


    
        default: return state;
    }
}
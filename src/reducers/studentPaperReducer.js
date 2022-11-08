import * as actions from "../actions/actionTypes";

export const studentPaperReducer = (state = {studentPapers:[], currentStudentPaper: "",result:{}},action)=>{
    
    switch (action.type) {
        case actions.GET_ALL_STUDENT_PAPERS:{
            return{
                ...state,
                studentPapers:[...action.payload],
            }
        }       

        case actions.GET_STUDENT_PAPERS_BYSTUDENTS:{
          return{
            ...state,
            studentPapers:[...action.payload]
          }
        }

        case actions.GET_RESULT_BYSTUDENT: {
          return {
            ...state,
            result: action.payload,
          };
        }
        case actions.GET_CURRENT_STUDENT_PAPER: {
          return {
            ...state,
            currentStudentPaper: action.payload,
          };
        }
           
        
        case actions.ADD_STUDENT_PAPER: {
            state.studentPapers.push(action.payload);
            return {
              ...state,
              studentPapers: [...state.studentPapers],
            };
          }
      
          case actions.UPDATE_STUDENT_PAPER: {
            const ele = state.studentPapers.filter(
              (studentPaper) => studentPaper._id === action.payload._id
            );
            const index = state.studentPapers.indexOf(ele[0]);
            state.studentPapers[index] = action.payload;
            return {
              ...state,
      
              studentPapers: [...state.studentPapers],
            };
          }
      
          case actions.DELETE_STUDENT_PAPER: {
            const newState = state.studentPapers.filter(
              (ele) => ele._id !== action.payload._id
            );
            return {
              ...state,      
              studentPapers: newState,
            };
          }
      

        


    
        default: return state;
    }
}
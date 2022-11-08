import * as actions from "../actions/actionTypes";

export const paperReducer = (state = { papers:[],currentPaper:"" }, action) => {
  switch (action.type) {
    case actions.GET_ALL_PAPERS: {
      return {
        ...state,
        papers: [...action.payload],
      };
    }
    case actions.GET_CURRENT_PAPER: {
      return {
        ...state,
        currentPaper: action.payload,
      };
    }
    case actions.ADD_PAPER: {
      state.papers.push(action.payload);
      return {
        ...state,
        papers: [...state.papers],
      };
    }

    case actions.UPDATE_PAPER: {
      const ele = state.papers.filter(
        (topic) => topic._id === action.payload._id
      );
      const index = state.papers.indexOf(ele[0]);
      state.papers[index] = action.payload;
      return {
        ...state,

        papers: [...state.papers],
      };
    }

    case actions.DELETE_PAPER: {
      const newState = state.papers.filter(
        (ele) => ele._id !== action.payload._id
      );
      return {
        ...state,

        papers: newState,
      };
    }


    default:
      return state;
  }
};

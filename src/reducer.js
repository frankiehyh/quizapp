import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "A":
      return { ...state, A: state.A + 1 };
    case "B":
      return { ...state, B: state.B + 1 };
    case "C":
      return { ...state, C: state.C + 1 };
    case "D":
      return { ...state, D: state.D + 1 };
    default:
      throw new Error();
  }
}

export default reducer;

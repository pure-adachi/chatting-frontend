import * as types from "../../constants/action-types";

const initialState = {
  cable: {
    subscription: null
  }
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case types.SET_CABLE:
      return {
        ...state,
        cable: {
          ...state.cable,
          subscription: action.cable
        }
      };
    default:
      return state;
  }
}

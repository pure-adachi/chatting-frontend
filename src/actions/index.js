import * as types from "../constants/action-types";

export function setCable(cable) {
  return {
    type: types.SET_CABLE,
    cable
  };
}

import { GET_FOOD } from "./action";

const initialState = {
  food: [],
  allFood: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOOD:
      return {
        ...state,
        food: action.payload,
        allFood: action.payload,
      };
    default:
      return state;
  }
}

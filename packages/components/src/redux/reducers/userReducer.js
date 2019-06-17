import * as actions from '../actions/actionTypes'

const initialState = {
  user: null
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case actions.CLEAR_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

import * as actions from '../actions/actionTypes'

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case actions.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case actions.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

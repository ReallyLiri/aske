import * as actions from '../actions/actionTypes'

const initialState = {
  currentRoute: '/',
  requiredAction: 'NOP' | 'PUSH' | 'POP' | 'REPLACE'
};

export default function navigation(state = initialState, action = {}) {
  if (action.route === state.currentRoute) {
    return {
      ...state,
      requiredAction: 'NOP'
    }
  }
  switch (action.type) {
    case actions.PUSH_NAVIGATION:
      return {
        ...state,
        currentRoute: action.route,
        requiredAction: 'PUSH'
      };
    default:
      return state;
  }
}

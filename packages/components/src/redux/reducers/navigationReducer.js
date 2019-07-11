import * as actions from '../actions/actionTypes'
import Logging from '../../infra/logging'

const initialState = {
  currentRoute: null,
  requiredAction: 'NOP' | 'PUSH' | 'POP' | 'REPLACE'
};

export default function navigation(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUSH_NAVIGATION:
      Logging.debug(`NavigationReducer: Push navigation from '${state.currentRoute}' to '${action.route}'`);
      return {
        ...state,
        currentRoute: action.route,
        requiredAction: 'PUSH'
      };
    case actions.POP_NAVIGATION:
      Logging.debug(`NavigationReducer: Pop navigation`);
      return {
        ...state,
        currentRoute: null,
        requiredAction: 'POP'
      };
    case actions.REPLACE_NAVIGATION:
      Logging.debug(`NavigationReducer: Replace navigation from '${state.currentRoute}' to '${action.route}'`);
      return {
        ...state,
        currentRoute: action.route,
        requiredAction: 'REPLACE'
      };
    default:
      return state;
  }
}

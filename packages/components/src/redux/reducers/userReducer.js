import * as actions from '../actions/actionTypes'
import Logging from '../../infra/logging'

const initialState = {
  user: null
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_USER:
      Logging.debug(`UserReducer: Setting user...`);
      Logging.debug(action.user);
      return {
        ...state,
        user: action.user
      };
    case actions.CLEAR_USER:
      Logging.debug(`UserReducer: Clearing user`);
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

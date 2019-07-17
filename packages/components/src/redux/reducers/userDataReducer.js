import * as actions from '../actions/actionTypes'
import Logging from '../../infra/logging'

const initialState = {
  userData: null
};

export default function userData(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_USER:
      Logging.debug(`UserReducer: Setting user...`);
      Logging.debug(action.userData);
      return {
        ...state,
        userData: action.userData
      };
    case actions.CLEAR_USER:
      Logging.debug(`UserReducer: Clearing user`);
      return {
        ...state,
        userData: null
      };
    default:
      return state;
  }
}

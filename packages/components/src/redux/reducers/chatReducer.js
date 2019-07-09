import * as actions from '../actions/actionTypes'
import Logging from '../../infra/logging'

const initialState = {
  contactUserData: null
};

export default function chat(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_CHAT_CONTACT:
      Logging.debug(`ChatReducer: Setting contact...`);
      Logging.debug(action.contactUserData);
      return {
        ...state,
        contactUserData: action.contactUserData
      };
    default:
      return state;
  }
}

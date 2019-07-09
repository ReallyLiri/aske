import * as types from './actionTypes'

export function setChatContact(contactUserData) {
  return {
    type: types.SET_CHAT_CONTACT,
    contactUserData: contactUserData
  };
}

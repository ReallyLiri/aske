import * as types from './actionTypes'

export function setUserData(userData) {
  return {
    type: types.SET_USER,
    userData: userData
  };
}

export function clearUserData() {
  return {
    type: types.CLEAR_USER
  };
}

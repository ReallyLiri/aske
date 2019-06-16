import * as types from './actionTypes'

export function pushNavigation(route) {
  return {
    type: types.PUSH_NAVIGATION,
    route: route
  };
}

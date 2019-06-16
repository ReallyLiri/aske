import * as types from './actionTypes'

export function pushNavigation(route) {
  return {
    type: types.PUSH_NAVIGATION,
    route: route
  };
}

export function popNavigation() {
  return {
    type: types.POP_NAVIGATION
  };
}

export function replaceNavigation(route) {
  return {
    type: types.REPLACE_NAVIGATION,
    route: route
  };
}

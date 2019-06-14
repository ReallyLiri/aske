import * as actions from '../actions/actionTypes'

const initialState = {
  selectedPokemon: null
};

export default function pokemon(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SELECT_POKEMON:
      return {
        ...state,
        selectedPokemon: action.pokemon
      };
    case actions.DESELECT_POKEMON:
      return {
        ...state,
        selectedPokemon: null
      };
    default:
      return state;
  }
}

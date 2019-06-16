import * as types from './actionTypes'

export function selectPokemon(pokemon) {
  return {
    type: types.SELECT_POKEMON,
    pokemon: pokemon
  };
}

export function deselectPokemon() {
  return {
    type: types.DESELECT_POKEMON
  };
}

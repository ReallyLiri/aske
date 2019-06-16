import React from 'react';

import BaseContainerComponent from '../../infra/baseContainerComponent';
import Pokemon from './pokemonComponent';
import * as pokemonActions from '../../redux/actions/pokemonActions';
import connectComponent from '../../redux/connect'

export class PokemonContainer extends BaseContainerComponent {

  render() {
    const {pokemonState, pokemonActions, navigationActions} = this.props;
    return (
      <Pokemon
        selectedPokemon={pokemonState.selectedPokemon}
        {...pokemonActions}
        {...navigationActions}
      />
    )
  }

  static connectState(state) {
    return {
      pokemonState: state.pokemon
    };
  }

  static connectActions() {
    return {
      pokemonActions: pokemonActions
    };
  }
}

export default connectComponent(PokemonContainer);

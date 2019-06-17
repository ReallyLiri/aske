import React from 'react';

import BaseContainerComponent from '../../infra/baseContainerComponent';
import Pokemon from './pokemonComponent';
import * as pokemonActions from '../../redux/actions/pokemonActions';
import connectComponent from '../../redux/connect'

export class PokemonContainer extends BaseContainerComponent {

  render() {
    if (!this.isLoaded()) {
      return super.render();
    }
    const {pokemonState, pokemonActions, navigationActions} = this.props;
    return (
      <Pokemon
        selectedPokemon={pokemonState.selectedPokemon}
        {...pokemonActions}
        {...navigationActions}
      />
    )
  }

  static mapStateToProps(state) {
    return {
      pokemonState: state.pokemon
    };
  }

  static mapDispatchToProps() {
    return {
      pokemonActions: pokemonActions
    };
  }
}

export default connectComponent(PokemonContainer);

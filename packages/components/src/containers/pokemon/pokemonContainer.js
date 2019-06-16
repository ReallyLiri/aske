import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseContainerComponent from '../../infra/baseContainerComponent';
import Pokemon from './pokemonComponent';

import * as pokemonActions from '../../redux/actions/pokemonActions';
import * as navigationActions from "../../redux/actions/navigationActions";

export class PokemonApp extends BaseContainerComponent {

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
}

export default connect(state => ({
    pokemonState: state.pokemon,
    navigationState: state.navigation
  }),
  (dispatch) => ({
    pokemonActions: bindActionCreators(pokemonActions, dispatch),
    navigationActions: bindActionCreators(navigationActions, dispatch)
  })
)(PokemonApp);

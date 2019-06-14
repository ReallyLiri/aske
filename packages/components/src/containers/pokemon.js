import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pokemonActions from '../infra/actions/pokemonActions';
import Pokemon from '../components/pokemon';

export class PokemonApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {state, actions, history} = this.props;
    return (
      <Pokemon
        selectedPokemon={state.selectedPokemon}
        history={history}
        {...actions} />
    )
  }
}

export default connect(state => ({
    state: state.pokemon
  }),
  (dispatch) => ({
    actions: bindActionCreators(pokemonActions, dispatch)
  })
)(PokemonApp);

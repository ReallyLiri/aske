import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pokemonActions from '../infra/actions/pokemonActions';
import Pokemon from '../components/pokemon';
import * as navigationActions from "../infra/actions/navigationActions";

export class PokemonApp extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props) {
    if (props.navigationState.requiredAction === 'PUSH') {
      props.history.push(props.navigationState.currentRoute);
    }
  }

  render() {
    const {state, actions, navActions, navigationState} = this.props;
    return (
      <Pokemon
        selectedPokemon={state.selectedPokemon}
        history={history}
        {...actions}
        {...navActions}
      />
    )
  }
}

export default connect(state => ({
    state: state.pokemon,
    navigationState: state.navigation
  }),
  (dispatch) => ({
    actions: bindActionCreators(pokemonActions, dispatch),
    navActions: bindActionCreators(navigationActions, dispatch)
  })
)(PokemonApp);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseContainerComponent from '../../infra/baseContainerComponent';
import Home from './homeComponent';

import * as pokemonActions from '../../redux/actions/pokemonActions';
import * as navigationActions from "../../redux/actions/navigationActions";

export class HomeApp extends BaseContainerComponent {

  render() {
    const {pokemonState, pokemonActions, navigationActions, navigationState} = this.props;
    return (
      <Home
        pokemon={pokemonState.pokemon}
        currentRoute={navigationState.currentRoute}
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
)(HomeApp);

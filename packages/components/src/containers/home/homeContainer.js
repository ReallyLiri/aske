import React from 'react';

import BaseContainerComponent from '../../infra/baseContainerComponent';
import Home from './homeComponent';
import * as pokemonActions from '../../redux/actions/pokemonActions';
import connectComponent from "../../redux/connect";

export class HomeContainer extends BaseContainerComponent {

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

export default connectComponent(HomeContainer);

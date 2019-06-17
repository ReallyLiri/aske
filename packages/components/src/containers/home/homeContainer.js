import React from 'react';

import BaseContainerComponent from '../../infra/baseContainerComponent';
import Home from './homeComponent';
import * as pokemonActions from '../../redux/actions/pokemonActions';
import connectComponent from "../../redux/connect";

export class HomeContainer extends BaseContainerComponent {

  render() {
    if (!this.isLoaded()) {
      return super.render();
    }
    const {pokemonState, pokemonActions, navigationActions, navigationState, userState} = this.props;
    return (
      <Home
        pokemon={pokemonState.pokemon}
        currentRoute={navigationState.currentRoute}
        user={userState.user}
        {...pokemonActions}
        {...navigationActions}
      />
    )
  }

  static mapStateToProps(state) {
    return {
      pokemonState: state.pokemon,
      userState: state.user
    };
  }

  static mapDispatchToProps() {
    return {
      pokemonActions: pokemonActions
    };
  }
}

export default connectComponent(HomeContainer);

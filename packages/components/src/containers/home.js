import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pokemonActions from '../infra/actions/pokemonActions';
import Home from '../components/home';
import * as navigationActions from "../infra/actions/navigationActions";

export class HomeApp extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props) {
    if (props.navigationState.requiredAction === 'PUSH') {
      props.history.push(props.navigationState.currentRoute);
    }
  }

  render() {
    const {state, actions, navActions, history, navigationState} = this.props;
    return (
      <Home
        pokemon={state.pokemon}
        currentRoute={navigationState.currentRoute}
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
)(HomeApp);

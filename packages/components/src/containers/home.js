import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pokemonActions from '../infra/actions/pokemonActions';
import Home from '../components/home';

export class HomeApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {state, actions, history} = this.props;
    return (
      <Home
        pokemon={state.pokemon}
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
)(HomeApp);

import React, { Component } from 'react';

import * as navigationActions from "../redux/actions/navigationActions";

export default class BaseContainerComponent extends Component {

  constructor(props) {
    super(props);
  }

  // Base navigation handling:

  componentWillReceiveProps(props) {
    switch (props.navigationState.requiredAction) {
      case 'PUSH':
        props.history.push(props.navigationState.currentRoute);
        break;
      case 'POP':
        if (props.history.length <= 2) {
          props.history.push('/');
        } else {
          props.history.goBack();
        }
        break;
      case 'REPLACE':
        props.history.replace(props.navigationState.currentRoute);
        break;
    }
  }

  static connectState(state) {
    return {
      navigationState: state.navigation
    }
  }

  static connectActions() {
    return {
      navigationActions: navigationActions
    }
  }

}

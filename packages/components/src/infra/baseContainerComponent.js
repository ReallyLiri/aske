import React, { Component } from 'react';
import { View, Text } from "react-native";

import * as navigationActions from "../redux/actions/navigationActions";
import * as userActions from "../redux/actions/userActions";
import PersistentStorage from './persistent-storage'

export default class BaseContainerComponent extends Component {

  constructor(props) {
    super(props);
  }

  // Base user state handling:

  async componentDidMount() {
    if (this.isLoaded()) {
      return;
    }
    const {setUser} = this.props.userActions;
    const user = await PersistentStorage.getUser();
    setUser(user);
    const {replaceNavigation} = this.props.navigationActions;
    if (!user) {
      console.log("No user - signup");
      replaceNavigation('/signup');
    }
  }

  isLoaded() {
    return !!this.props.userState.user;
  }

  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Base navigation handling:

  componentDidUpdate(prevProps, prevState) {
    if (this.props.navigationState.currentRoute === prevProps.navigationState.currentRoute) {
      return;
    }
    switch (this.props.navigationState.requiredAction) {
      case 'PUSH':
        this.props.history.push(this.props.navigationState.currentRoute);
        break;
      case 'POP':
        if (this.props.history.length <= 2) {
          this.props.history.push('/');
        } else {
          this.props.history.goBack();
        }
        break;
      case 'REPLACE':
        this.props.history.replace(this.props.navigationState.currentRoute);
        break;
    }
  }

  static mapStateToProps(state) {
    return {
      navigationState: state.navigation,
      userState: state.user
    }
  }

  static mapDispatchToProps() {
    return {
      navigationActions: navigationActions,
      userActions: userActions
    }
  }

}

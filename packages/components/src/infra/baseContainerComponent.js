import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableOpacity } from "react-native";

import * as navigationActions from "../redux/actions/navigationActions";
import * as userActions from "../redux/actions/userActions";
import pokeStore from "../assets/pokemonStore";

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
    const user = await AsyncStorage.getItem('USER_KEY');
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

  componentWillReceiveProps(props) {
    switch (props.navigationState.requiredAction) {
      case 'PUSH':
        if (props.location.pathname === props.navigationState.currentRoute) {
          return;
        }
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
        if (props.location.pathname === props.navigationState.currentRoute) {
          return;
        }
        props.history.replace(props.navigationState.currentRoute);
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

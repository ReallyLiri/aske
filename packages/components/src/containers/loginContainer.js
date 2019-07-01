import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import * as userActions from "../redux/actions/userActions";
import PersistentStorage from '../infra/persistent-storage'
import { ColorScheme } from "../theme/colorScheme";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import AuthService from "../services/authService";
import { condVisibility } from "../theme/styleSheets";

export class LoginContainer extends BaseContainerComponent {

  state = {
    username: '',
    error: null
  };

  login = async () => {
    const response = await AuthService.login(this.state.username);
    if (response.error) {
      this.setState({error: response.error});
      return;
    }
    const {replaceNavigation} = this.props.navigationActions;
    const {setUser} = this.props.userActions;
    setUser(response.userData);
    await PersistentStorage.setUser(this.state);
    replaceNavigation(ROUTES.HOME);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[{color: 'red', height: 20}, condVisibility(this.state.error)]}>{this.state.error}</Text>
        <TextInput
          style={styles.input}
          placeholder={Strings.ENTER_NAME}
          placeholderTextColor={ColorScheme.primary}
          autoCapitalize="none"
          onChangeText={val => this.setState({username: val, error: null})}
        />
        {
          <TouchableOpacity
            style={[styles.loginButton, condVisibility(this.state.username)]}
            onPress={this.login}>
            <Text style={styles.buttonText}>{Strings.LOGIN}</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {
      userActions: userActions
    };
  }
}

export default connectComponent(LoginContainer);

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: ColorScheme.lightPurple,
    color: ColorScheme.darkPurple,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  loginButton: {
    width: 150,
    height: 55,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.primary
  },
  buttonText: {
    fontWeight: 'bold',
    color: ColorScheme.secondary
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

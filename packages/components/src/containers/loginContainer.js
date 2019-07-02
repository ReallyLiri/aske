import React from 'react'
import {
  View,
  TextInput,
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
import { condVisibility, uniteStyle } from "../theme/styleSheets";

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
      <View style={uniteStyle.container}>
        <Text style={[uniteStyle.errorMessage, condVisibility(this.state.error)]}>{this.state.error}</Text>
        <TextInput
          style={uniteStyle.input}
          placeholder={Strings.ENTER_NAME}
          placeholderTextColor={ColorScheme.primary}
          autoCapitalize="none"
          onChangeText={val => this.setState({username: val, error: null})}
        />
        {
          <TouchableOpacity
            style={[uniteStyle.actionButton, condVisibility(this.state.username)]}
            onPress={this.login}>
            <Text style={uniteStyle.actionButtonText}>{Strings.LOGIN}</Text>
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

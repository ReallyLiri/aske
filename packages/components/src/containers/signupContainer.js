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
import LocalStorage from '../infra/local-storage'
import { ColorScheme } from "../theme/colorScheme";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { condVisibility, uniteStyle } from "../theme/styleSheets";
import AuthService from "../services/authService";
import { hashPassword } from "../infra/utils";

export class SignUpContainer extends BaseContainerComponent {

  state = {
    userData: {
      username: '',
      password: '',
      mantra: ''
    },
    error: null
  };

  onChangeText = (key, val) => {
    this.setState({userData: {...this.state.userData, [key]: val}});
  };

  signUp = async () => {
    const response = await AuthService.register(this.state.userData);
    if (response.error) {
      this.setState({error: response.error});
      return;
    }
    const {replaceNavigation} = this.props.navigationActions;
    const {setUser} = this.props.userActions;
    setUser(response.userData);
    await LocalStorage.setUser(response.userData);
    replaceNavigation(ROUTES.HOME);
  };

  render() {
    return (
      <View style={uniteStyle.container}>
        <Text style={[
          uniteStyle.errorMessage,
          condVisibility(this.state.error)
        ]}>
          {this.state.error}
        </Text>
        <TextInput
          style={uniteStyle.input}
          placeholder={Strings.ENTER_NAME}
          placeholderTextColor={ColorScheme.overlay}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={uniteStyle.input}
          placeholder={Strings.ENTER_PASSWORD}
          placeholderTextColor={ColorScheme.overlay}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.onChangeText('password', hashPassword(val))}
        />
        <TextInput
          style={uniteStyle.input}
          placeholder={Strings.ENTER_MANTRA}
          placeholderTextColor={ColorScheme.overlay}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('mantra', val)}
        />
        <TouchableOpacity
          style={[
            uniteStyle.actionButton,
            condVisibility(this.state.userData.username && this.state.userData.password && this.state.userData.mantra)
          ]}
          onPress={this.signUp}>
          <Text style={uniteStyle.actionButtonText}>{Strings.REGISTER}</Text>
        </TouchableOpacity>
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

export default connectComponent(SignUpContainer);

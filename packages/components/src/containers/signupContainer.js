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
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { condVisibility, uniteStyle } from "../theme/styleSheets";
import AuthService from "../services/authService";

export class SignUpContainer extends BaseContainerComponent {

  state = {
    userData: {
      username: '',
      password: '',
      passwordVerify: ''
    },
    error: null
  };

  onChangeText = (key, val) => {
    this.setState({userData: {...this.state.userData, [key]: val}});
  };

  signUp = async () => {
    if (this.state.userData.password !== this.state.userData.passwordVerify) {
      this.setState({
        userData: {username: '', password: '', passwordVerify: ''},
        error: Strings.ERROR_PASSWORD
      });
      return;
    }
    const response = await AuthService.register(this.state.userData);
    if (response.error) {
      this.setState({
        userData: {username: '', password: '', passwordVerify: ''},
        error: response.error
      });
      return;
    }
    const {replaceNavigation} = this.props.navigationActions;
    const {setUser} = this.props.userActions;
    setUser(response.userData);
    await LocalStorage.setUser(response.userData);
    replaceNavigation(ROUTES.PROFILE);
  };

  render() {
    return (
      <View style={uniteStyle.container}>
        <Text style={uniteStyle.titleText}>{Strings.USERNAME}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('username', val)}
          value={this.state.userData.username}
        />
        <Text style={uniteStyle.titleText}>{Strings.PASSWORD}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.onChangeText('password', val)}
          value={this.state.userData.password}
        />
        <Text style={uniteStyle.titleText}>{Strings.PASSWORD_AGAIN}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.onChangeText('passwordVerify', val)}
          value={this.state.userData.passwordVerify}
        />
        <TouchableOpacity
          style={[
            uniteStyle.actionButton,
            condVisibility(this.state.userData.username && this.state.userData.password && this.state.userData.passwordVerify)
          ]}
          onPress={this.signUp}>
          <Text style={uniteStyle.actionButtonText}>{Strings.NEXT}</Text>
        </TouchableOpacity>
        <Text style={[
          uniteStyle.errorMessage,
          condVisibility(this.state.error)
        ]}>
          {this.state.error}
        </Text>
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

import React from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import BaseContainerComponent from "./baseContainerComponent";
import connectComponent from "../redux/connect";
import * as userActions from "../redux/actions/userActions";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { condVisibility, askeStyle } from "../theme/styleSheets";
import AuthService from "../services/authService";
import { randomPicture } from "../data/profilePictures";
import UserDataService from "../services/userDataService";
import LocalStorage from "../infra/local-storage";

export class SignUpContainer extends BaseContainerComponent {

  state = {
    isReady: true,
    username: '',
    password: '',
    passwordVerify: '',
    error: null
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  signUp = async () => {
    if (this.state.password !== this.state.passwordVerify) {
      this.setState({
        username: '', password: '', passwordVerify: '',
        error: Strings.ERROR_PASSWORD
      });
      return;
    }

    this.setState({isReady: false});

    const response = await AuthService.register(this.state.username, this.state.password);
    if (response.error) {
      this.setState({
        isReady: true,
        username: '', password: '', passwordVerify: '',
        error: response.error
      });
      return;
    }

    const userData = {
      username: this.state.username,
      image: randomPicture(),
      channels: {}
    };
    this.props.userActions.setUserData(userData);
    await LocalStorage.setUsername(userData.username);
    await UserDataService.update(userData);

    this.props.history.replace(ROUTES.PROFILE);
  };

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    return (
      <View style={[askeStyle.container, {paddingTop: 150}]}>
        <Text style={askeStyle.titleText}>{Strings.USERNAME}</Text>
        <TextInput
          style={askeStyle.input}
          autoFocus
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('username', val)}
          value={this.state.username}
        />
        <Text style={askeStyle.titleText}>{Strings.PASSWORD}</Text>
        <TextInput
          style={askeStyle.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.onChangeText('password', val)}
          value={this.state.password}
        />
        <Text style={askeStyle.titleText}>{Strings.PASSWORD_AGAIN}</Text>
        <TextInput
          style={askeStyle.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.onChangeText('passwordVerify', val)}
          value={this.state.passwordVerify}
        />
        <TouchableOpacity
          disabled={!(this.state.username && this.state.password && this.state.passwordVerify)}
          style={[
            askeStyle.actionButton,
            condVisibility(this.state.username && this.state.password && this.state.passwordVerify)
          ]}
          onPress={this.signUp}>
          <Text style={askeStyle.actionButtonText}>{Strings.NEXT}</Text>
        </TouchableOpacity>
        <Text style={[
          askeStyle.errorMessage,
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

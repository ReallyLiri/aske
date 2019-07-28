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
import * as questionActions from "../redux/actions/questionActions";
import LocalStorage from '../infra/local-storage'
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import AuthService from "../services/authService";
import { condVisibility, askeStyle } from "../theme/styleSheets";
import UserDataService from "../services/userDataService";

export class LoginContainer extends BaseContainerComponent {

  state = {
    isLoading: false,
    username: '',
    password: '',
    error: null
  };

  login = async () => {
    const doc = await AuthService.login(this.state.username, this.state.password);
    if (doc.error) {
      this.setState({
        username: '',
        password: '',
        error: doc.error
      });
      return;
    }

    this.setState({isLoading: true});

    await LocalStorage.setUsername(this.state.username);

    const userData = (await UserDataService.get(this.state.username)).userData;
    this.props.userActions.setUserData(userData);
    await this.loadQuestions();

    this.props.history.replace(ROUTES.HOME);
  };

  render() {
    if (this.state.isLoading) {
      return this.loadingPlaceholder();
    }
    return (
      <View style={[askeStyle.container, {paddingTop: 150}]}>
        <Text style={askeStyle.titleText}>{Strings.USERNAME}</Text>
        <TextInput
          style={askeStyle.input}
          autoFocus
          autoCapitalize="none"
          onChangeText={val => this.setState({username: val, error: null})}
          value={this.state.username}
        />
        <Text style={askeStyle.titleText}>{Strings.PASSWORD}</Text>
        <TextInput
          style={askeStyle.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.setState({password: val, error: null})}
          value={this.state.password}
        />
        <TouchableOpacity
          style={[
            askeStyle.actionButton,
            condVisibility(this.state.username && this.state.password)
          ]}
          onPress={this.login}>
          <Text style={askeStyle.actionButtonText}>{Strings.ENTER}</Text>
        </TouchableOpacity>
        <Text style={[askeStyle.errorMessage, condVisibility(this.state.error)]}>{this.state.error}</Text>
      </View>
    )
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {
      userActions: userActions,
      questionActions: questionActions
    };
  }
}

export default connectComponent(LoginContainer);

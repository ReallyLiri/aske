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
import * as questionActions from "../redux/actions/questionActions";
import LocalStorage from '../infra/local-storage'
import { ColorScheme } from "../theme/colorScheme";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import AuthService from "../services/authService";
import { condVisibility, uniteStyle } from "../theme/styleSheets";
import { QUESTIONS } from "../data/questions";

export class LoginContainer extends BaseContainerComponent {

  state = {
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

    const {setUser} = this.props.userActions;
    setUser(doc.userData);
    await LocalStorage.setUser(doc.userData);

    if (doc.responses && doc.responses.length) {
      const {setQuestions, markQuestionsCompleted} = this.props.questionActions;
      const questions = QUESTIONS;
      for (let i = 0; i < doc.responses.length; i++) {
        questions[i].response = doc.responses[i].response;
      }
      setQuestions(questions);
      console.error(questions);
      await LocalStorage.setQuestions(questions);
      if (doc.responses.length === questions.length) {
        markQuestionsCompleted();
      }
    }

    const {replaceNavigation} = this.props.navigationActions;
    replaceNavigation(ROUTES.HOME);
  };

  render() {
    return (
      <View style={uniteStyle.container}>
        <Text style={uniteStyle.titleText}>{Strings.USERNAME}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          onChangeText={val => this.setState({username: val, error: null})}
          value={this.state.username}
        />
        <Text style={uniteStyle.titleText}>{Strings.PASSWORD}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={val => this.setState({password: val, error: null})}
          value={this.state.password}
        />
        <TouchableOpacity
          style={[
            uniteStyle.actionButton,
            condVisibility(this.state.username && this.state.password)
          ]}
          onPress={this.login}>
          <Text style={uniteStyle.actionButtonText}>{Strings.LOGIN}</Text>
        </TouchableOpacity>
        <Text style={[uniteStyle.errorMessage, condVisibility(this.state.error)]}>{this.state.error}</Text>
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

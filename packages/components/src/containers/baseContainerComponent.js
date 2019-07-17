import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from "react-native";

import * as userActions from "../redux/actions/userActions";
import * as questionActions from "../redux/actions/questionActions";
import LocalStorage from '../infra/local-storage'
import { ROUTES } from "../routes";
import UserDataService from "../services/userDataService";
import ResponsesService from "../services/responsesService";
import { QUESTIONS } from "../data/questions";
import { ColorScheme } from "../theme/colorScheme";

export default class BaseContainerComponent extends Component {

  constructor(props) {
    super(props);
  }

  async loadUserData() {
    if (this.props.userState.userData) {
      return this.props.userState.userData;
    }
    const username = await LocalStorage.getUsername();
    if (!username) {
      return null;
    }
    const userData = (await UserDataService.get(username)).userData;
    this.props.userActions.setUserData(userData);
    return userData;
  }

  async guardUserData() {
    const userData = await this.loadUserData();
    if (!userData) {
      this.props.history.replace(ROUTES.WELCOME);
      return false;
    }
    return true;
  }

  async loadQuestions() {
    if (this.props.questionsState.questions) {
      return this.props.questionsState;
    }
    const responses = (await ResponsesService.get(this.props.userState.userData.username)).responses || [];
    const questions = QUESTIONS;
    responses.forEach((responseItem, index) => {
      questions[index].response = responseItem.response
    });
    this.props.questionActions.setQuestions(questions);
    const allCompleted = questions.every(question => !!question.response);
    if (allCompleted) {
      this.props.questionActions.markQuestionsCompleted();
    }
    return {questions: questions, completed: allCompleted};
  }

  async guardQuestions() {
    const {completed} = await this.loadQuestions();
    if (!completed) {
      this.props.history.replace(ROUTES.QUESTIONS);
      return false;
    }
    return true;
  }

  loadingPlaceholder() {
    return (
      <View style={{padding: 150}}>
        <Text style={{fontSize: 20, color: ColorScheme.text, paddingBottom: 20, fontWeight: 'bold'}}>Loading...</Text>
        <ActivityIndicator size="large" color={ColorScheme.text} />
      </View>
    );
  }

  static mapStateToProps(state) {
    return {
      userState: state.userData,
      questionsState: state.questions
    }
  }

  static mapDispatchToProps() {
    return {
      userActions: userActions,
      questionActions: questionActions
    }
  }

}

import React, { Component } from 'react';
import { View, Text } from "react-native";

import * as userActions from "../redux/actions/userActions";
import * as questionActions from "../redux/actions/questionActions";
import LocalStorage from './local-storage'
import { ROUTES } from "../routes";

export default class BaseContainerComponent extends Component {

  constructor(props) {
    super(props);
  }

  // Base user state handling:

  async loadUser() {
    if (this.props.userState.user) {
      return this.props.userState.user;
    }
    const user = await LocalStorage.getUser();
    this.props.userActions.setUser(user);
    return user;
  }

  async guardUser() {
    const user = await this.loadUser();
    if (!user) {
      this.props.history.replace(ROUTES.WELCOME);
      return false;
    }
    return true;
  }

  async loadQuestions() {
    if (this.props.questionsState.questions) {
      return this.props.questionsState;
    }
    const questions = await LocalStorage.getQuestions();
    this.props.questionActions.setQuestions(questions);
    const allCompleted = questions && questions.every(q => !!q.response);
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
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  static mapStateToProps(state) {
    return {
      userState: state.user,
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

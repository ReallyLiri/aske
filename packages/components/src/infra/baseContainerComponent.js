import React, { Component } from 'react';
import { View, Text } from "react-native";

import * as navigationActions from "../redux/actions/navigationActions";
import * as userActions from "../redux/actions/userActions";
import * as questionActions from "../redux/actions/questionActions";
import PersistentStorage from './persistent-storage'

export default class BaseContainerComponent extends Component {

  constructor(props) {
    super(props);
  }

  // Base user state handling:

  async loadUser() {
    if (this.props.userState.user) {
      return this.props.userState.user;
    }
    const user = await PersistentStorage.getUser();
    this.props.userActions.setUser(user);
    return user;
  }

  async guardUser() {
    const {replaceNavigation} = this.props.navigationActions;
    const user = await this.loadUser();
    if (!user) {
      console.log("No user - signup");
      replaceNavigation('/signup');
      return false;
    }
    return true;
  }

  async loadQuestions() {
    if (this.props.questionsState.questions) {
      return this.props.questionsState;
    }
    const questions = await PersistentStorage.getQuestions();
    this.props.questionActions.setQuestions(questions);
    const allCompleted = questions && questions.every(q => !!q.response);
    if (allCompleted) {
      this.props.questionActions.markQuestionsCompleted();
    }
    return {questions: questions, completed: allCompleted};
  }

  async guardQuestions() {
    const {replaceNavigation} = this.props.navigationActions;
    const {questions, completed} = await this.loadQuestions();
    if (!completed) {
      console.log("Need to answer questions");
      replaceNavigation('/questions');
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

  // Base navigation handling:

  componentDidUpdate(prevProps, prevState) {
    if (this.props.navigationState.currentRoute === prevProps.navigationState.currentRoute) {
      return;
    }
    switch (this.props.navigationState.requiredAction) {
      case 'PUSH':
        this.props.history.push(this.props.navigationState.currentRoute);
        break;
      case 'POP':
        if (this.props.history.length <= 2) {
          this.props.history.push('/');
        } else {
          this.props.history.goBack();
        }
        break;
      case 'REPLACE':
        this.props.history.replace(this.props.navigationState.currentRoute);
        break;
    }
  }

  static mapStateToProps(state) {
    return {
      navigationState: state.navigation,
      userState: state.user,
      questionsState: state.questions
    }
  }

  static mapDispatchToProps() {
    return {
      navigationActions: navigationActions,
      userActions: userActions,
      questionActions: questionActions
    }
  }

}

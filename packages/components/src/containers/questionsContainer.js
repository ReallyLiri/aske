import React from 'react';

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from '../redux/connect'
import { QUESTIONS } from "../data/questions";
import PersistentStorage from "../infra/persistent-storage"
import { Image, Text, View, Button } from "react-native";
import * as responses from "../data/questionResponse";

export class QuestionsContainer extends BaseContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      questions: null,
      currentQuestionIdx: null
    };
  }

  async componentDidMount() {
    if (!await this.guardUser()) {
      return;
    }

    let {questions, completed} = await this.loadQuestions();
    if (completed) {
      this.props.navigationActions.pushNavigation('/');
      return;
    }

    if (!questions) {
      questions = QUESTIONS;
      await PersistentStorage.setQuestions(questions);
      this.setState({
        isReady: true,
        questions: questions,
        currentQuestionIdx: 0
      });
      return;
    }

    const firstUnansweredQuestionIdx = questions.findIndex(q => !q.response);
    this.setState({
      isReady: true,
      questions: questions,
      currentQuestionIdx: firstUnansweredQuestionIdx
    });
  }

  async onQuestionResponse(response) {
    const {questions, currentQuestionIdx} = this.state;
    questions[this.state.currentQuestionIdx].response = response;
    await PersistentStorage.setQuestions(this.state.questions);
    if (currentQuestionIdx === questions.length - 1) {
      this.props.questionActions.markQuestionsCompleted();
      this.props.navigationActions.pushNavigation('/');
      return;
    }
    this.setState({
      isReady: true,
      questions: this.state.questions,
      currentQuestionIdx: this.state.currentQuestionIdx + 1
    });
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }

    const {title, leftAnswer, rightAnswer, leftPicture, rightPicture} = this.state.questions[this.state.currentQuestionIdx];

    return (
      <View>
        <View>
          <View>
            <Text>{`${this.state.currentQuestionIdx + 1}/${this.state.questions.length}`}</Text>
            <Text>{title}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text>{leftAnswer}</Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text>{rightAnswer}</Text>
              </View>
            </View>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: leftPicture}}
                  onClick={() => this.onQuestionResponse(responses.RIGHT_ANSWER)}
                />
              </View>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: rightPicture}}
                  onClick={() => this.onQuestionResponse(responses.LEFT_ANSWER)}
                />
              </View>
            </View>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Button
                  style={{width: 50, height: 50}}
                  onPress={() => this.onQuestionResponse(responses.LEFT_ANSWER)}
                   title={"Both"}
                />
              </View>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Button
                  style={{width: 50, height: 50}}
                  onPress={() => this.onQuestionResponse(responses.LEFT_ANSWER)}
                   title={"None"}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {};
  }
}

export default connectComponent(QuestionsContainer);

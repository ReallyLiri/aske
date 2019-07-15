import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from '../redux/connect'
import { QUESTIONS } from "../data/questions";
import LocalStorage from "../infra/local-storage"
import * as responses from "../data/questionResponse";
import { ColorScheme } from "../theme/colorScheme";
import { ROUTES } from "../routes";
import UserDataService from "../services/userDataService";
import { condVisibility, uniteStyle } from "../theme/styleSheets";
import { conditionalExpression } from "@babel/types";

export class QuestionsContainer extends BaseContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      questions: null,
      currentQuestionIdx: null,
      showTitles: false
    };
  }

  async componentDidMount() {
    if (!await this.guardUser()) {
      return;
    }

    let {questions, completed} = await this.loadQuestions();

    let firstUnansweredQuestionIdx;
    if (!questions) {
      questions = QUESTIONS;
      await LocalStorage.setQuestions(questions);
      firstUnansweredQuestionIdx = 0;
    } else {
      firstUnansweredQuestionIdx = completed ? questions.length - 1 : questions.findIndex(q => !q.response);
    }

    this.setState({
      isReady: true,
      questions: questions,
      currentQuestionIdx: firstUnansweredQuestionIdx
    });
  }

  currentQuestion() {
    return this.state.questions[this.state.currentQuestionIdx];
  }

  async onQuestionsCompleted() {
    this.setState({
      isReady: false
    });
    this.props.questionActions.markQuestionsCompleted();
    const {user} = this.props.userState;
    await UserDataService.update(user, this.state.questions);
    this.props.history.push(ROUTES.HOME);
  }

  async onQuestionResponse(response) {
    const {questions, currentQuestionIdx} = this.state;
    questions[this.state.currentQuestionIdx].response = response;
    await LocalStorage.setQuestions(this.state.questions);
    if (currentQuestionIdx === questions.length - 1) {
      await this.onQuestionsCompleted();
      return;
    }
    this.setState({
      isReady: true,
      questions: this.state.questions,
      currentQuestionIdx: this.state.currentQuestionIdx + 1
    });
  }

  buttonStyle(associatedResponse) {
    const selectedResponse = this.currentQuestion().response;
    if (associatedResponse !== selectedResponse) {
      return styles.button
    }
    return [styles.button, {borderColor: ColorScheme.text}]
  }

  async navigate(direction) {
    if (direction === 'PREV') {
      this.setState({currentQuestionIdx: this.state.currentQuestionIdx - 1})
    } else if (direction === 'NEXT') {
      if (this.state.currentQuestionIdx === this.state.questions.length - 1) {
        await this.onQuestionsCompleted();
      } else {
        this.setState({currentQuestionIdx: this.state.currentQuestionIdx + 1})
      }
    }
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }

    const {leftAnswer, rightAnswer, leftPicture, rightPicture} = this.currentQuestion();

    return (
      <View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
          <Text
            style={styles.titleText}>{`${this.state.currentQuestionIdx + 1}/${this.state.questions.length}`}
          </Text>
          <View style={[styles.row, condVisibility(this.state.showTitles)]}>
            <View style={styles.col}>
              <Text style={styles.questionTitle}>{leftAnswer}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.questionTitle}>{rightAnswer}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.col} onPress={() => this.onQuestionResponse(responses.LEFT_ANSWER)}>
              <Text style={styles.imagePlaceholder}>...</Text>
              <Image
                style={this.buttonStyle(responses.LEFT_ANSWER)}
                source={{uri: leftPicture}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.col} onPress={() => this.onQuestionResponse(responses.RIGHT_ANSWER)}>
              <Text style={styles.imagePlaceholder}>...</Text>
              <Image
                style={this.buttonStyle(responses.RIGHT_ANSWER)}
                source={{uri: rightPicture}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity
                style={this.buttonStyle(responses.BOTH_ANSWERS)}
                onPress={() => this.onQuestionResponse(responses.BOTH_ANSWERS)}>
                <Text style={styles.buttonText}>Both</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity
                style={this.buttonStyle(responses.NONE_ANSWERS)}
                onPress={() => this.onQuestionResponse(responses.BOTH_ANSWERS)}>
                <Text style={styles.buttonText}>None</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.navButtons}>
            <TouchableOpacity
              disabled={this.state.currentQuestionIdx === 0}
              style={condVisibility(this.state.currentQuestionIdx > 0)}
              onPress={() => this.navigate('PREV')}>
              <Text style={[uniteStyle.actionButtonText, {fontSize: 14, textAlign: 'left'}]}>← Previous</Text>
            </TouchableOpacity>
            <View style={{width: 200}}/>
            <TouchableOpacity
              disabled={!this.currentQuestion().response}
              style={condVisibility(!!this.currentQuestion().response)}
              onPress={() => this.navigate('NEXT')}>
              <Text style={[uniteStyle.actionButtonText, {fontSize: 14}]}>Next →</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.explainContent, {top: this.state.showTitles ? 150 : 190}]}
          onPress={() => this.setState({showTitles: !this.state.showTitles})}>
          <Text style={[
            styles.explainMark,
            {fontSize: this.state.showTitles ? 120 : 80}
          ]}>?</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: ColorScheme.text,
    padding: 30
  },
  questionTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorScheme.text
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  col: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10,
    justifyContent: 'center'
  },
  imagePlaceholder: {
    alignSelf: 'center',
    position: 'absolute',
    color: ColorScheme.text,
    fontWeight: 'bold',
    fontSize: 30
  },
  button: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: ColorScheme.overlay,
    borderWidth: 5,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: ColorScheme.text
  },
  navButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    width: '100%'
  },
  explainContent: {
    alignSelf: 'center',
    position: 'absolute'
  },
  explainMark: {
    fontWeight: 'bold',
    color: ColorScheme.lightText
  }
});


export default connectComponent(QuestionsContainer);

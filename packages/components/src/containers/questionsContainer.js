import React from 'react';

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from '../redux/connect'
import { QUESTIONS } from "../data/questions";
import PersistentStorage from "../infra/persistent-storage"
import { Image, Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as responses from "../data/questionResponse";
import { ColorScheme } from "../theme/colorScheme";

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
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
            <Text>{`Question #${this.state.currentQuestionIdx + 1}/${this.state.questions.length}`}</Text>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>{leftAnswer}</Text>
              </View>
              <View style={styles.col}>
                <Text>{rightAnswer}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.col} onPress={(ev) => console.error(ev)}>
                <Image
                  style={styles.button}
                  source={{uri: leftPicture}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.col} onPress={() => this.onQuestionResponse(responses.LEFT_ANSWER)}>
                <Image
                  style={styles.button}
                  source={{uri: rightPicture}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onQuestionResponse(responses.BOTH_ANSWERS)}>
                  <Text style={styles.buttonText}>Both</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.col}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onQuestionResponse(responses.BOTH_ANSWERS)}>
                  <Text style={styles.buttonText}>None</Text>
                </TouchableOpacity>
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

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  col: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10
  },
  button: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.lightPurple,
    borderColor: ColorScheme.primary,
    borderWidth: 5,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});


export default connectComponent(QuestionsContainer);

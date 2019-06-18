import React from 'react';

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from "../redux/connect";
import { Text, Button, View } from "react-native";
import PersistentStorage from "../infra/persistent-storage"

export class HomeContainer extends BaseContainerComponent {

  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  async componentDidMount() {
    if(!await this.guardUser()) {
      return;
    }
    if (!await this.guardQuestions()) {
      return;
    }
    this.setState({ready: true});
  }

  async clearData() {
    this.setState({ready: false});
    this.props.userActions.clearUser();
    this.props.questionActions.clearQuestions();
    await PersistentStorage.clearQuestions();
    await PersistentStorage.clearUser();
    await this.guardUser();
  }

  render() {
    if (!this.state.ready) {
      return this.loadingPlaceholder();
    }
    return (
    <View>
      <Text>User: {this.props.userState.user.username}</Text>
      <Text>Responses:<br/>{JSON.stringify(this.props.questionsState.questions)}</Text>
      <Button onPress={async () => this.clearData()} title={"Clear Data"}/>
    </View>
  );
  }

  static mapStateToProps(state) {
    return {
    };
  }

  static mapDispatchToProps() {
    return {
    };
  }
}

export default connectComponent(HomeContainer);

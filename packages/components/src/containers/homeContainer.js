import React from 'react';
import { Text, Button, View } from "react-native";

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from "../redux/connect";
import PersistentStorage from "../infra/persistent-storage"
import MatchingService from "../services/matchingService";

export class HomeContainer extends BaseContainerComponent {

  constructor(props) {
    super(props);
    this.state = {ready: false, matches: []};
  }

  async componentDidMount() {
    if (!await this.guardUser()) {
      return;
    }
    if (!await this.guardQuestions()) {
      return;
    }
    const matches = await MatchingService.getMatches(this.props.userState.user.id);
    this.setState({ready: true, matches: matches});
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
    console.error(this.state.matches);
    return (
      <View style={{width: 200}}>
        <Text>Matches for {this.props.userState.user.username}:<br/><br/></Text>
        {
          this.state.matches && this.state.matches.length ?
            this.state.matches.map(match => (
              <Text key={match.userData.id}>Match with {match.userData.username}: {match.score}%</Text>
            ))
            :
            <Text>No matches :(</Text>
        }
        <Button onPress={async () => this.clearData()} title={"Clear Data"}/>
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

export default connectComponent(HomeContainer);

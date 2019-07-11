import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from "../redux/connect";
import MatchingService from "../services/matchingService";
import { uniteStyle } from "../theme/styleSheets";
import { ROUTES } from "../routes";
import * as chatActions from "../redux/actions/chatActions";
import { ColorScheme } from "../theme/colorScheme";
import { mergeColors } from "../infra/utils";

export class MatchesContainer extends BaseContainerComponent {

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

  onMatchClick(match) {
    this.props.chatActions.setChatContact(match.userData);
    this.props.navigationActions.pushNavigation(ROUTES.CHAT);
  }

  render() {
    if (!this.state.ready) {
      return this.loadingPlaceholder();
    }
    return (
      <View style={uniteStyle.container}>
        {
          this.state.matches && this.state.matches.length ?
            this.state.matches.map(match => (
              <TouchableOpacity
                key={match.userData.id}
                style={[
                  style.match,
                  {
                    backgroundColor: mergeColors(
                      ColorScheme.matchBackgroundMin,
                      ColorScheme.matchBackgroundMax,
                      match.score / 100
                    ),
                    alignSelf: 'center',
                    width: '90%'
                  }
                ]}
                onPress={() => this.onMatchClick(match)}>
                <Text style={style.matchText}>Match with {match.userData.username}: {match.score}%</Text>
              </TouchableOpacity>
            ))
            :
            <Text>No matches :(</Text>
        }
      </View>
    );
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {
      chatActions: chatActions
    };
  }
}

const style = StyleSheet.create({
  match: {
    alignSelf: 'stretch',
    width: '100%',
    height: 55,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.matchBackgroundMax
  },
  matchText: {
    fontWeight: 'bold',
    color: ColorScheme.matchText
  }
});

export default connectComponent(MatchesContainer);

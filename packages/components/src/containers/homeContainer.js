import React from 'react';
import { Text, Button, View, TouchableOpacity } from "react-native";

import BaseContainerComponent from '../infra/baseContainerComponent';
import connectComponent from "../redux/connect";
import LocalStorage from "../infra/local-storage"
import MatchingService from "../services/matchingService";
import { uniteStyle } from "../theme/styleSheets";
import CollapsingFooter from "../components/collapsing-footer";
import { ROUTES } from "../routes";
import * as chatActions from "../redux/actions/chatActions";

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
    await LocalStorage.clearQuestions();
    await LocalStorage.clearUser();
    await this.guardUser();
  }

  onMatchClick(match) {
    this.props.chatActions.setChatContact(match.userData);
    this.props.navigationActions.pushNavigation(ROUTES.CHAT);
  }

  _renderView = (collapse) => {
    return (
      <View>
        <Text>Toggle {collapse ? 'on' : 'off'}</Text>
      </View>
    )
  }

  _renderCollapseView = (collapse) => {
    return(
      <View>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
      </View>
    )
  }


  render() {
    if (!this.state.ready) {
      return this.loadingPlaceholder();
    }
    console.error(this.state.matches);
    return (
      <View style={{width: 200}}>
        <CollapsingFooter
          renderView={this._renderView}
          renderCollapseView={this._renderCollapseView}
        />
        <Text>Matches for {this.props.userState.user.username}:<br/><br/></Text>
        {
          this.state.matches && this.state.matches.length ?
            this.state.matches.map(match => (
              <TouchableOpacity
                key={match.userData.id}
                style={uniteStyle.actionButton}
                onPress={() => this.onMatchClick(match)}>
                <Text style={uniteStyle.actionButtonText}>Match with {match.userData.username}: {match.score}%</Text>
              </TouchableOpacity>
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
    return {
      chatActions: chatActions
    };
  }
}

export default connectComponent(HomeContainer);

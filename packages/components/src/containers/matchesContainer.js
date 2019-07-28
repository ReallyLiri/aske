import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

import BaseContainerComponent from './baseContainerComponent';
import connectComponent from "../redux/connect";
import MatchingService from "../services/matchingService";
import { askeStyle } from "../theme/styleSheets";
import { ROUTES } from "../routes";
import * as chatActions from "../redux/actions/chatActions";
import { ColorScheme } from "../theme/colorScheme";
import { mergeColors } from "../infra/utils";
import { DEFAULT_PICTURE } from "../data/profilePictures";
import UserDataService from "../services/userDataService";
import { Strings } from "../data/strings";

export class MatchesContainer extends BaseContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      matches: []
    };
  }

  async componentDidMount() {
    if (!await this.guardUserData()) {
      return;
    }
    if (!await this.guardQuestions()) {
      return;
    }
    const matches = await MatchingService.getMatches(this.props.userState.userData.username);
    const dataFetch = matches.map(match => UserDataService.get(match.username));
    (await Promise.all(dataFetch)).forEach((response, index) => {
      matches[index].userData = response.userData;
    });
    this.setState({isReady: true, matches: matches});
  }

  onMatchClick(match) {
    this.props.chatActions.setChatContact(match.userData);
    this.props.history.push(`${ROUTES.CHAT}?u=${encodeURI(match.userData.username)}`);
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    const matchWidth = Dimensions.get('window').width - 20;
    return (
      <View style={askeStyle.container}>
        {
          this.state.matches && this.state.matches.length ?
            this.state.matches.map((match, index) => (
              <TouchableOpacity
                key={match.username}
                style={[
                  styles.match,
                  {
                    backgroundColor: mergeColors(
                      ColorScheme.matchBackgroundMin,
                      ColorScheme.matchBackgroundMax,
                      (1 - index / this.state.matches.length)
                    ),
                    alignSelf: 'center',
                    width: matchWidth
                  }
                ]}
                onPress={() => this.onMatchClick(match)}>
                <Image style={styles.profilePicture} source={{uri: match.userData.image || DEFAULT_PICTURE}}/>
                <View>
                  <Text style={styles.matchName}>{match.userData.username}</Text>
                  <Text style={styles.matchPhrase}>{match.userData.phrase}</Text>
                </View>
              </TouchableOpacity>
            ))
            :
            <Text style={[askeStyle.actionButtonText, {paddingTop: 200}]}>{Strings.NO_MATCHES}</Text>
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

const styles = StyleSheet.create({
  match: {
    alignSelf: 'stretch',
    height: 55,
    margin: 5,
    borderRadius: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: ColorScheme.matchBackgroundMax,
    flex: 1,
    flexDirection: 'row'
  },
  matchName: {
    fontWeight: 'bold',
    color: ColorScheme.lightText
  },
  matchPhrase: {
    fontWeight: 'bold',
    color: ColorScheme.text,
    fontSize: 12
  },
  profilePicture: {
    margin: 10,
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: ColorScheme.button,
    backgroundColor: 'white'
  }
});

export default connectComponent(MatchesContainer);

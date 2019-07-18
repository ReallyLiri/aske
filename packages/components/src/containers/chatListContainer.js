import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

import BaseContainerComponent from './baseContainerComponent';
import connectComponent from "../redux/connect";
import { uniteStyle } from "../theme/styleSheets";
import { ROUTES } from "../routes";
import * as chatActions from "../redux/actions/chatActions";
import { ColorScheme } from "../theme/colorScheme";
import { DEFAULT_PICTURE } from "../data/profilePictures";
import UserDataService from "../services/userDataService";
import { Strings } from "../data/strings";

export class ChatListContainer extends BaseContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      channels: []
    };
  }

  async componentDidMount() {
    if (!await this.guardUserData()) {
      return;
    }
    if (!await this.guardQuestions()) {
      return;
    }
    const channelsMap = this.props.userState.userData.channels;
    const channels = Object.keys(channelsMap).map(username => {
      return {
        username: username,
        channelId: channelsMap[username]
      }
    });
    const dataFetch = channels
      .map(channel => UserDataService.get(channel.username));
    (await Promise.all(dataFetch)).forEach((response, index) => {
      channels[index].userData = response.userData;
    });
    this.setState({isReady: true, channels: channels});
  }

  onChatClick(channel) {
    this.props.chatActions.setChatContact(channel.userData);
    this.props.history.push(`${ROUTES.CHAT}?u=${encodeURI(channel.username)}`);
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    const itemWidth = Dimensions.get('window').width - 20;
    return (
      <View style={uniteStyle.container}>
        {
          this.state.channels && this.state.channels.length ?
            this.state.channels.map((channel, index) => (
              <TouchableOpacity
                key={channel.username}
                style={[
                  styles.channel,
                  {
                    backgroundColor: ColorScheme.matchBackgroundMax,
                    alignSelf: 'center',
                    width: itemWidth
                  }
                ]}
                onPress={() => this.onChatClick(channel)}>
                <Image style={styles.profilePicture} source={channel.userData.image || DEFAULT_PICTURE}/>
                <View>
                  <Text style={styles.username}>{channel.userData.username}</Text>
                  <Text style={styles.userphrase}>{channel.userData.phrase}</Text>
                </View>
              </TouchableOpacity>
            ))
            :
            <Text style={[uniteStyle.actionButtonText, {paddingTop: 200}]}>{Strings.NO_CHATS}</Text>
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
  channel: {
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
  username: {
    fontWeight: 'bold',
    color: ColorScheme.lightText
  },
  userphrase: {
    fontWeight: 'bold',
    color: ColorScheme.text,
    fontSize: 12
  },
  profilePicture: {
    margin: 10,
    height: 50,
    width: 50,
    borderRadius: '100%',
    borderWidth: 5,
    borderColor: ColorScheme.button,
    backgroundColor: 'white'
  }
});

export default connectComponent(ChatListContainer);

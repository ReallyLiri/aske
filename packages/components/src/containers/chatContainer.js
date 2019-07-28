import React from 'react'
import {Text, View, TouchableOpacity, TextInput, StyleSheet, Image} from "react-native";
import queryString from 'query-string';

import BaseContainerComponent from "./baseContainerComponent";
import connectComponent from "../redux/connect";
import ChatService from "../services/chatService";
import {ROUTES} from "../routes";
import {askeStyle} from "../theme/styleSheets";
import {Strings} from "../data/strings";
import {ColorScheme} from "../theme/colorScheme";
import {utcTimestampToDate} from "../infra/utils";
import UserDataService from "../services/userDataService";
import {DEFAULT_PICTURE} from "../data/profilePictures";
import Logging from "../infra/logging";
import {Dimensions} from "react-native-web";

export class ChatContainer extends BaseContainerComponent {

  unsubscribe = null;
  usersByName = new Map();
  contactUserData = null;
  channelId = null;

  state = {
    isReady: false,
    messages: [],
    nextMessage: ''
  };

  static onNewMessage(ref, message) {
    const {messages} = ref.state;
    messages.push(message);
    ref.setState({messages: messages});
  }

  async componentDidMount() {
    if (!await this.guardUserData()) {
      return;
    }

    const myUserData = this.props.userState.userData;
    this.contactUserData = this.props.chatState.contactUserData;
    if (!this.contactUserData) {
      let contactUsername = queryString.parse(this.props.location.search).u;
      if (!contactUsername) {
        Logging.error('Navigated to chat page without context');
        this.props.history.replace(ROUTES.HOME);
        return;
      }
      contactUsername = decodeURI(contactUsername);
      if (contactUsername === myUserData.username) {
        Logging.error('Cannot chat with self');
        this.props.history.replace(ROUTES.HOME);
        return;
      }
      const response = await UserDataService.get(contactUsername);
      if (!response) {
        Logging.error(`Invalid username '${contactUsername}'`);
        this.props.history.replace(ROUTES.HOME);
        return;
      }
      this.contactUserData = response.userData;
    }

    this.usersByName.set(myUserData.username, myUserData);
    this.usersByName.set(this.contactUserData.username, this.contactUserData);

    this.channelId = await ChatService.getOrCreateChannel(myUserData, this.contactUserData, this.props.userActions.setUserData);

    this.unsubscribe = ChatService.registerForNewMessages(this.channelId, myUserData.username, this, ChatContainer.onNewMessage);
    const messages = await ChatService.latestMessages(this.channelId, myUserData.username, 10);
    this.setState({isReady: true, messages: messages});
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  async publishMessage() {
    if (!this.state.nextMessage) {
      return;
    }
    const myUserData = this.props.userState.userData;
    this.setState({nextMessage: ''});
    await ChatService.publishMessage(this.channelId, myUserData.username, this.state.nextMessage);
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    return (
      <View style={askeStyle.container}>
        <Text style={[askeStyle.titleText, style.titleText]}>
          {`${Strings.CHAT_WITH} ${this.contactUserData.username}`}
        </Text>
        <Image style={askeStyle.profilePicture} source={{uri: this.contactUserData.image || DEFAULT_PICTURE}}/>
        {
          this.state.messages.map(message => (
            <Text
              style={{color: ColorScheme.text}}
              key={message.id}>
              [{utcTimestampToDate(message.timestamp).toLocaleString()}] {this.usersByName.get(message.source).username} says:
              "{message.text}"
            </Text>
          ))
        }
        <View style={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'column',
          paddingTop: 25
        }}>
          <TextInput
            autoFocus={true}
            multiline
            style={[askeStyle.input, {width: 'auto', height: 150}]}
            placeholderTextColor={ColorScheme.overlay}
            autoCapitalize="none"
            onChangeText={val => this.setState({nextMessage: val})}
            value={this.state.nextMessage}
          />
          <TouchableOpacity
            style={[askeStyle.actionButton, {width: 'auto'}]}
            onPress={() => this.publishMessage()}>
            <Text style={[askeStyle.actionButtonText, {fontSize: 16}]}>{Strings.SEND}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  static mapStateToProps(state) {
    return {
      chatState: state.chat,
    };
  }

  static mapDispatchToProps() {
    return {};
  }
}

const style = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    padding: 20
  }
});

export default connectComponent(ChatContainer);

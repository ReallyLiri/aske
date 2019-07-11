import React from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import ChatService from "../services/chatService";
import { ROUTES } from "../routes";
import { condVisibility, uniteStyle } from "../theme/styleSheets";
import { Strings } from "../data/strings";
import { ColorScheme } from "../theme/colorScheme";
import { utcTimestampToDate } from "../infra/utils";

export class ChatContainer extends BaseContainerComponent {

  unsubscribe = null;
  usersById = new Map();

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
    if (!await this.guardUser()) {
      return;
    }
    if (!await this.guardQuestions()) {
      return;
    }
    const myUserData = this.props.userState.user;
    const {contactUserData} = this.props.chatState;
    if (!contactUserData) {
      this.props.navigationActions.replaceNavigation(ROUTES.HOME);
      return;
    }

    this.usersById.set(myUserData.id, myUserData);
    this.usersById.set(contactUserData.id, contactUserData);

    this.unsubscribe = ChatService.register(myUserData.id, contactUserData.id, this, ChatContainer.onNewMessage);
    const messages = await ChatService.latestMessages(myUserData.id, contactUserData.id, 10);
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
    const myUserData = this.props.userState.user;
    const {contactUserData} = this.props.chatState;
    this.setState({nextMessage: ''});
    await ChatService.publish(myUserData.id, contactUserData.id, this.state.nextMessage);
  }

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    const {contactUserData} = this.props.chatState;

    return (
      <View style={uniteStyle.container}>
        <Text
          style={[uniteStyle.titleText, style.titleText]}>{`${Strings.CHAT_WITH} ${contactUserData.username}`}</Text>
        {
          this.state.messages.map(message => (
            <Text
              style={{color: ColorScheme.text}}
              key={message.id}>
              [{utcTimestampToDate(message.timestamp).toLocaleString()}] {this.usersById.get(message.owner).username} says:
              "{message.text}"
            </Text>
          ))
        }
        <View style={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          paddingTop: 25
        }}>
          <TextInput
            style={[uniteStyle.input, {width: 250}]}
            placeholderTextColor={ColorScheme.overlay}
            autoCapitalize="none"
            onChangeText={val => this.setState({nextMessage: val})}
            value={this.state.nextMessage}
          />
          <TouchableOpacity
            style={[uniteStyle.actionButton, {width: 70}]}
            onPress={() => this.publishMessage()}>
            <Text style={[uniteStyle.actionButtonText, {fontSize: 16}]}>{Strings.SEND}</Text>
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

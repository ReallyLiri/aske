import React from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image, StyleSheet
} from 'react-native'

import BaseContainerComponent from "./baseContainerComponent";
import connectComponent from "../redux/connect";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { askeStyle } from "../theme/styleSheets";
import UserDataService from "../services/userDataService";
import { ColorScheme } from "../theme/colorScheme";
import { DEFAULT_PICTURE } from "../data/profilePictures";

export class ProfileContainer extends BaseContainerComponent {

  state = {
    isReady: false,
    isNewUser: null,
    name: '',
    age: '',
    phrase: ''
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  async componentDidMount() {
    if (!await this.guardUserData()) {
      return;
    }
    const {questions} = await this.loadQuestions();
    const hasAnyResponse = questions && questions.find(q => q.response);
    const {userData} = this.props.userState;
    this.setState({
      isReady: true,
      isNewUser: !hasAnyResponse,
      name: userData.name || '',
      age: userData.age || '',
      phrase: userData.phrase || ''
    })
  }

  async save() {
    const userData = {
      ...this.props.userState.userData,
      name: this.state.name,
      age: this.state.age,
      phrase: this.state.phrase,
    };
    await UserDataService.update(userData);
    this.props.userActions.setUserData(userData);
    this.props.history.push(ROUTES.HOME);
  };

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    return (
      <View style={askeStyle.container}>
        <TouchableOpacity
          onPress={() => this.props.history.push(ROUTES.PROFILE_PICTURE)}>
          <Image style={askeStyle.profilePicture} source={{uri: this.props.userState.userData.image || DEFAULT_PICTURE}}/>
        </TouchableOpacity>
        <Text style={askeStyle.titleText}>{Strings.NAME}</Text>
        <TextInput
          style={askeStyle.input}
          autoFocus
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('name', val)}
          value={this.state.name}
        />
        <Text style={askeStyle.titleText}>{Strings.AGE}</Text>
        <TextInput
          style={askeStyle.input}
          autoCapitalize="none"
          keyboardType='numeric'
          onChangeText={val => this.onChangeText('age', val)}
          value={this.state.age}
        />
        <Text style={askeStyle.titleText}>{Strings.PHRASE}</Text>
        <TextInput
          multiline={true}
          style={[askeStyle.input, {height: 120}]}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('phrase', val)}
          value={this.state.phrase}
        />
        <TouchableOpacity
          style={askeStyle.actionButton}
          onPress={() => this.save()}>
          <Text style={askeStyle.actionButtonText}>{this.state.isNewUser ? Strings.ENTER : Strings.SAVE}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {};
  }
}

export default connectComponent(ProfileContainer);

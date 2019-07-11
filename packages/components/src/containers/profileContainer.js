import React from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'

import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import LocalStorage from '../infra/local-storage'
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { uniteStyle } from "../theme/styleSheets";
import UserDataService from "../services/userDataService";

export class ProfileContainer extends BaseContainerComponent {

  state = {
    isReady: false,
    isNewUser: null,
    name: '',
    age: null,
    phrase: ''
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  async componentDidMount() {
    if (!await this.guardUser()) {
      return;
    }
    const {questions} = await this.loadQuestions();
    const hasAnyResponse = questions.find(q => q.response);
    const {user} = this.props.userState;
    this.setState({
      isReady: true,
      isNewUser: !hasAnyResponse,
      name: user.name,
      age: user.age,
      phrase: user.phrase
    })
  }

  async save() {
    const {user} = this.props.userState;
    const {questions, completed} = await this.loadQuestions();
    const userData = {...user, name: this.state.name, age: this.state.age, phrase: this.state.phrase};
    await UserDataService.update(userData, completed ? questions : null);
    this.props.userActions.setUser(userData);
    await LocalStorage.setUser(userData);
    this.props.navigationActions.pushNavigation(ROUTES.HOME);
  };

  render() {
    if (!this.state.isReady) {
      return this.loadingPlaceholder();
    }
    return (
      <View style={uniteStyle.container}>
        <Text style={uniteStyle.titleText}>{Strings.NAME}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('name', val)}
          value={this.state.name}
        />
        <Text style={uniteStyle.titleText}>{Strings.AGE}</Text>
        <TextInput
          style={uniteStyle.input}
          autoCapitalize="none"
          keyboardType='numeric'
          onChangeText={val => this.onChangeText('age', val)}
          value={this.state.age}
        />
        <Text style={uniteStyle.titleText}>{Strings.PHRASE}</Text>
        <TextInput
          multiline={true}
          style={[uniteStyle.input, {height: 120}]}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('phrase', val)}
          value={this.state.phrase}
        />
        <TouchableOpacity
          style={uniteStyle.actionButton}
          onPress={() => this.save()}>
          <Text style={uniteStyle.actionButtonText}>{this.state.isNewUser ? Strings.ENTER : Strings.SAVE}</Text>
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

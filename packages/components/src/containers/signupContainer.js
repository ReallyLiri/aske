import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import * as userActions from "../redux/actions/userActions";
import PersistentStorage from '../infra/persistent-storage'
import { ColorScheme } from "../theme/colorScheme";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";

export class SignUpContainer extends BaseContainerComponent {

  state = {
    username: '',
    mantra: ''
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  signUp = async () => {
    const {replaceNavigation} = this.props.navigationActions;
    const {setUser} = this.props.userActions;
    setUser(this.state);
    await PersistentStorage.setUser(this.state);
    replaceNavigation(ROUTES.HOME);
  };

  commitEnabled() {
    return this.state.username && this.state.mantra;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={Strings.ENTER_NAME}
          placeholderTextColor={ColorScheme.primary}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder={Strings.ENTER_MANTRA}
          placeholderTextColor={ColorScheme.primary}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('mantra', val)}
        />
        {
          this.commitEnabled() ?
            <TouchableOpacity
              style={styles.commit}
              onPress={this.signUp}>
              <Text style={styles.buttonText}>{Strings.REGISTER}</Text>
            </TouchableOpacity>
            :
            <Text style={{height: 75}}/> // 75 is height+padding
        }
      </View>
    )
  }

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps() {
    return {
      userActions: userActions
    };
  }
}

export default connectComponent(SignUpContainer);

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: ColorScheme.lightPurple,
    color: ColorScheme.darkPurple,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  commit: {
    width: 150,
    height: 55,
    margin: 10,
    padding: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.primary
  },
  buttonText: {
    fontWeight: 'bold',
    color: ColorScheme.secondary
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import BaseContainerComponent from "../../infra/baseContainerComponent";
import connectComponent from "../../redux/connect";
import * as userActions from "../../redux/actions/userActions";
import Storage from '../../infra/storage'

export class SignUpContainer extends BaseContainerComponent {

  state = {
    username: '', password: '', email: '', phone_number: ''
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  };

  signUp = async () => {
    const { username, password, email, phone_number } = this.state;
    const {replaceNavigation} = this.props.navigationActions;
    const {setUser} = this.props.userActions;
    setUser(this.state);
    await Storage.setUser(this.state);
    replaceNavigation('/');
  };

  isLoaded() {
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }

  static mapStateToProps(state) {
    return {
    };
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
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

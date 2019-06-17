import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet, AsyncStorage
} from 'react-native'
import BaseContainerComponent from "../../infra/baseContainerComponent";
import * as pokemonActions from "../../redux/actions/pokemonActions";
import connectComponent from "../../redux/connect";

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
    try {
      AsyncStorage.setItem('USER_KEY', this.state);
      console.log('user successfully signed up!: ')
    } catch (err) {
      console.log('error signing up: ', err)
    }
    replaceNavigation('/home');
  };

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
      pokemonState: state.pokemon
    };
  }

  static mapDispatchToProps() {
    return {
      pokemonActions: pokemonActions
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

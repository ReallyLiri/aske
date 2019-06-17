import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import connectComponent from "../../redux/connect";
import BaseContainerComponent from "../../infra/baseContainerComponent";

export class InitializingContainer extends BaseContainerComponent {
  async componentDidMount() {
    const {replaceNavigation} = this.props.navigationActions;
    try {
       await new Promise(resolve => setTimeout(resolve, 2000));
      const user = await AsyncStorage.getItem('USER_KEY');
      console.error(user);
      console.error(this.props);
      if (user) {
        replaceNavigation('/home');
      } else {
        replaceNavigation('/signup');
      }
    } catch (err) {
      console.error(err);
      replaceNavigation('/signup');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    )
  }

  static connectState(state) {
    return {
    };
  }

  static connectActions() {
    return {
    };
  }
}

export default connectComponent(InitializingContainer);

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

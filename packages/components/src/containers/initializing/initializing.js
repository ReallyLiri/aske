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
       await new Promise(resolve => setTimeout(resolve, 2000)); // for show
      const user = await AsyncStorage.getItem('USER_KEY');
      if (user) {
        replaceNavigation('/home');
      } else {
        console.log("No user - signup");
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

  static mapStateToProps(state) {
    return {
    };
  }

  static mapDispatchToProps() {
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

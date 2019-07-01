import React from 'react'
import {
  View,
  StyleSheet, Text, TouchableOpacity
} from 'react-native'
import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import { ColorScheme } from "../theme/colorScheme";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";

export class WelcomeContainer extends BaseContainerComponent {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>{Strings.WELCOME}</Text>
        <TouchableOpacity
          style={styles.commit}
          onPress={() => this.props.navigationActions.pushNavigation(ROUTES.LOGIN)}>
          <Text style={styles.buttonText}>{Strings.LOGIN}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commit}
          onPress={() => this.props.navigationActions.pushNavigation(ROUTES.SINGUP)}>
          <Text style={styles.buttonText}>{Strings.SINGUP}</Text>
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

export default connectComponent(WelcomeContainer);

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

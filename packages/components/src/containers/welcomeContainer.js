import React from 'react'
import {
  View,
  Text,
  TouchableOpacity, StyleSheet
} from 'react-native'
import BaseContainerComponent from "./baseContainerComponent";
import connectComponent from "../redux/connect";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { askeStyle } from "../theme/styleSheets";
import { ColorScheme } from "../theme/colorScheme";

export class WelcomeContainer extends BaseContainerComponent {

  render() {
    return (
      <View style={[askeStyle.container, {paddingTop: 200}]}>
        <Text style={style.welcome}>{Strings.WELCOME}</Text>
        <Text style={style.welcome}>U N I T E</Text>
        <View style={{paddingTop: 50}}>
          <TouchableOpacity
            style={askeStyle.actionButton}
            onPress={() => this.props.history.push(ROUTES.LOGIN)}>
            <Text style={askeStyle.actionButtonText}>{Strings.LOGIN}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={askeStyle.actionButton}
            onPress={() => this.props.history.push(ROUTES.SIGNUP)}>
            <Text style={askeStyle.actionButtonText}>{Strings.SINGUP}</Text>
          </TouchableOpacity>
        </View>
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

const style = StyleSheet.create({
  welcome: {
    fontWeight: 'bold',
    color: ColorScheme.text,
    fontSize: 40
  }
});

export default connectComponent(WelcomeContainer);

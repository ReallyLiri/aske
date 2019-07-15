import React from 'react'
import {
  View,
  Text,
  TouchableOpacity, StyleSheet
} from 'react-native'
import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { uniteStyle } from "../theme/styleSheets";
import { ColorScheme } from "../theme/colorScheme";

export class WelcomeContainer extends BaseContainerComponent {

  render() {
    return (
      <View style={[uniteStyle.container, {paddingTop: 200}]}>
        <Text style={style.welcome}>{Strings.WELCOME}</Text>
        <Text style={style.welcome}>U N I T E</Text>
        <View style={{paddingTop: 50}}>
        <TouchableOpacity
          style={uniteStyle.actionButton}
          onPress={() => this.props.navigationActions.pushNavigation(ROUTES.LOGIN)}>
          <Text style={uniteStyle.actionButtonText}>{Strings.LOGIN}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={uniteStyle.actionButton}
          onPress={() => this.props.navigationActions.pushNavigation(ROUTES.SINGUP)}>
          <Text style={uniteStyle.actionButtonText}>{Strings.SINGUP}</Text>
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

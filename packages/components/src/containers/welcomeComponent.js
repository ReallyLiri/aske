import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import BaseContainerComponent from "../infra/baseContainerComponent";
import connectComponent from "../redux/connect";
import { Strings } from "../data/strings";
import { ROUTES } from "../routes";
import { uniteStyle } from "../theme/styleSheets";

export class WelcomeContainer extends BaseContainerComponent {

  render() {
    return (
      <View style={uniteStyle.container}>
        <Text style={uniteStyle.actionButtonText}>{Strings.WELCOME}</Text>
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

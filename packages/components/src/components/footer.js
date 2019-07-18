import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { withRouter } from '../infra/routing';
import {connect} from "react-redux";

import { isRouteWithFooter, ROUTES } from "../routes";
import { ColorScheme } from "../theme/colorScheme";
import { Strings } from "../data/strings";

class Footer extends Component {

  link(to, text) {
    return (
      <TouchableOpacity
        style={{
          width: 80,
          height: 30,
          backgroundColor: ColorScheme.background,
          borderRadius: 14,
          margin: 10
        }}
        onPress={() => this.props.history.push(to)}
      >
        <Text
          style={{
            color: ColorScheme.text,
            textAlign: 'center',
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  };

  render() {
    const {pathname} = this.props.location;
    if (!isRouteWithFooter(pathname)) {
      return null;
    }
    return (
      <View style={{
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorScheme.overlay,
        height: 70,
        width: '100%'
      }}>
        {this.link(ROUTES.PROFILE, Strings.PROFILE)}
        {this.link(ROUTES.QUESTIONS, Strings.QUESTIONS)}
        {this.link(ROUTES.HOME, Strings.MATCHES)}
        {this.link(ROUTES.CHATS, Strings.CHATS)}
      </View>
    )
  }

  static mapStateToProps(state) {
    return {
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
    }
  }

}

export default withRouter(connect(Footer.mapStateToProps, Footer.mapDispatchToProps)(Footer));

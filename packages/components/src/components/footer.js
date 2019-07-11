import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { withRouter } from '../infra/routing';

import { isRouteWithFooter } from "../routes";
import { ColorScheme } from "../theme/colorScheme";

class Footer extends Component {

  render() {
    const {pathname} = this.props.location;
    if (!isRouteWithFooter(pathname)) {
      return null;
    }
    return (
      <View style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        <View style={{width: '100%', height: 50, backgroundColor: 'powderblue'}}/>
        <View style={{width: '100%', height: 50, backgroundColor: 'skyblue'}}/>
        <View style={{width: '100%', height: 50, backgroundColor: 'steelblue'}}/>
      </View>
    )
  }

}

export default withRouter(Footer);

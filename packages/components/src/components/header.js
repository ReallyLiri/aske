import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import { withRouter } from '../infra/routing';

import { ColorScheme } from '../theme/colorScheme';
import { isRouteWithHeader } from "../routes";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.overlay,
    width: '100%',
    height: Platform.OS === 'ios' ? 95 : 55
  },
  title: {
    color: ColorScheme.text,
    fontSize: 50,
    fontFamily: 'OldeEnglish-Regular',
    paddingTop: Platform.OS === 'ios' ? 40 : 0
  }
});

class Header extends Component {

  render() {
    const {pathname} = this.props.location;
    if (!isRouteWithHeader(pathname)) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ASKE</Text>
      </View>
    )
  }

}

export default withRouter(Header);

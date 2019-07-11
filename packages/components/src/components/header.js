import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
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
    height: 50
  },
  title: {
    fontWeight: 'bold',
    color: ColorScheme.text,
    fontSize: 25
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
        <Text style={styles.title}>U N I T E</Text>
      </View>
    )
  }

}

export default withRouter(Header);

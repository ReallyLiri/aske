import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { ColorScheme } from '../theme/colorScheme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.lightPurple,
    width: '100%',
    height: 50
  },
  title: {
    fontWeight: 'bold',
    color: ColorScheme.overlay
  }
});

export default class Header extends Component {

  render() {
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

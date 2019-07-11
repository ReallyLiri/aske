import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import {ColorScheme} from '../theme/colorScheme';

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

export default class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>U N I T E</Text>
      </View>
    )
  }

}

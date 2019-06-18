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
    backgroundColor: ColorScheme.lightPurple,
    width: '100%',
    height: 50
  },
  title: {
    fontWeight: 'bold',
    color: ColorScheme.primary
  }
});

export default class Header extends Component {

  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }

}

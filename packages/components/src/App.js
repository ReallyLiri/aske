import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Router, Switch, Route } from './components/routing/routing';
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import { Navigation } from './components/navigation'

const instructions = Platform.select({
  web: 'Free reload!',
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {

  state = {
    selectedPokemon: null
  };

  selectPokemon = selectedPokemon => {
    this.setState({
      selectedPokemon
    });
  };

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Unite.!</Text>
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={
                props => <Home
                  {...props} selectPokemon={this.selectPokemon}
                />
              }
            />
            <Route
              path="/pokemon"
              render={
                props => <Pokemon
                  {...props}
                  selectedPokemon={this.state.selectedPokemon}
                />
              }
            />
          </Switch>
        </Router>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
    padding: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 15,
    marginBottom: 5,
  },
});

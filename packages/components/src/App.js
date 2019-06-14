import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Router, Switch, Route } from './infra/routing/routing';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './infra/reducers';
import HomeApp from "./containers/home";
import PokemonApp from "./containers/pokemon";
import CounterApp from "./containers/counterApp";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {state, actions} = this.props;
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to Unite.!</Text>
          <CounterApp/>
          <Router>
            <Switch>
              <Route
                exact path="/"
                render={
                  props => <HomeApp
                      {...props}
                  />
                }
              />
              <Route
                path="/pokemon"
                render={
                  props => <PokemonApp
                    {...props}
                  />
                }
              />
            </Switch>
          </Router>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      </Provider>
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


const instructions = Platform.select({
  web: 'Free reload!',
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

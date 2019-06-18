import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Router, Switch, Route } from './infra/routing';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './redux/reducers';
import { ColorScheme } from './theme/colorScheme';
import HomeContainer from "./containers/homeContainer";
import QuestionsContainer from "./containers/questionsContainer";
import SignUpContainer from "./containers/signupContainer";
import Header from "./components/header";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header
            {...this.props}
            title="UNITE HEADER"
          />
          <View style={styles.content}>
            <Router>
              <Switch>
                <Route
                  exact path="/"
                  render={
                    props => <HomeContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path="/signup"
                  render={
                    props => <SignUpContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path="/questions"
                  render={
                    props => <QuestionsContainer
                      {...props}
                    />
                  }
                />
                <Route
                  // Default case - 404
                  render={
                    props => <HomeContainer
                      {...props}
                    />
                  }
                />
              </Switch>
            </Router>
          </View>
          <Header
            {...this.props}
            title="UNITE FOOTER"
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.darkPurple,
    padding: 50
  },
  content: {
    padding: 50,
    height: '100%'
  }
});

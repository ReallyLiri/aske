import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Router, Switch, Route } from './infra/routing';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './redux/reducers';
import { ColorScheme } from './theme/colorScheme';
import HomeContainer from "./containers/matchesContainer";
import QuestionsContainer from "./containers/questionsContainer";
import SignUpContainer from "./containers/signupContainer";
import WelcomeContainer from "./containers/welcomeContainer";
import LoginContainer from "./containers/loginContainer";
import ChatContainer from "./containers/chatContainer";
import Header from "./components/header";
import Footer from "./components/footer";
import { ROUTES } from './routes';
import FireBase from "./services/firebase";
import ProfileContainer from "./containers/profileContainer";
import ProfilePictureContainer from "./containers/profilePictureContainer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {

  constructor(props) {
    super(props);
    FireBase.initialize();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Router>
            <Header {...this.props}/>
            <ScrollView
              style={styles.content}
              contentContainerStyle={{
                justifyContent: 'center', alignItems: 'center'
              }}>
              <Switch>
                <Route
                  exact path={ROUTES.HOME}
                  render={
                    props => <HomeContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.WELCOME}
                  render={
                    props => <WelcomeContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.LOGIN}
                  render={
                    props => <LoginContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.SINGUP}
                  render={
                    props => <SignUpContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.QUESTIONS}
                  render={
                    props => <QuestionsContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.CHAT}
                  render={
                    props => <ChatContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.PROFILE}
                  render={
                    props => <ProfileContainer
                      {...props}
                    />
                  }
                />
                <Route
                  path={ROUTES.PROFILE_PICTURE}
                  render={
                    props => <ProfilePictureContainer
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
            </ScrollView>
            <Footer {...this.props}/>
          </Router>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.background,
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingBottom: 80
  }
});

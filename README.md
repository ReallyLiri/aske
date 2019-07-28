# ASKE Questionnaire-Based Matching

![ASKE](https://i.imgur.com/xzMzQfg.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/cf8f0489-08c4-4a68-9992-53b45364440b/deploy-status)](https://app.netlify.com/sites/aske/deploys)

This is an experimental app written in `React-Native-Web`. It can be run on all of browser, iOS and Android easily.

In addition, the app is using `React-Redux` and `FireBase`.

## Run

Make sure you have `react-native` installed: `npm install -g --save react-native@latest`.


From project root, run `yarn` to install all dependencies.

### Web

Run `yarn web` (alias for `yarn workspace web start`), app will be available at http://localhost:3003. Port is configurable via `components/web/.env`.

![web](https://i.imgur.com/qEE1q5a.png)

### iOS

Run `yarn mobile` in background. Its a blocking command.

Run `yarn xcode` to open the iOS project, then simply run in Xcode via iPhone simulator.

Or you can simply run `yarn ios` (wrapper to `react-native run-ios`) and simulator will be opened immediately.

![ios](https://i.imgur.com/y9qfsa5.png)

### Android

Run `yarn mobile` in background. Its a blocking command.

Run `yarn studio` to open Android project.

You'd need to create any Android simulator to run on. We do it using the `AVD Manager` (top right corner). Once a simulator is running, you

To run only from command line: 

* Make sure you have an emulator listed: `emulator -list-avds`
* Start up your emulator: `emulator -avd [avd-name]` (i.e `emulator -avd [avd-name]`). Note this is a blocking command.
* Run `yarn android` (wrapper to `react-native run-android`)

## Deployment

Web is deployed to https://aske.netlify.com/ on any push to `master`. Mobile deployments TBD.

## TODO

* Fix UI compatibility to Android.
* Chat UI is not implemented.
* Back button is missing in login/register screens
* Use icons in footer navigation
* Implement matching logic in backend (FireBase) using lambda.
* Custom icon for mobile apps.
* Small UI bugs.

## References

When building this app I used the following recommended tutorials:

[Setting up a mono-repo RNW project](https://dev.to/brunolemos/tutorial-100-code-sharing-between-ios-android--web-using-react-native-web-andmonorepo-4pej)

[RNW navigation example](https://medium.com/@jonnykalambay/your-first-hybrid-app-in-15-minutes-react-native-on-the-web-2cc2646051e)

[RNW redux example](https://github.com/montogeek/react-native-web-redux)

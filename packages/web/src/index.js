import { AppRegistry } from 'react-native'

import App from 'components/src/App'

AppRegistry.registerComponent('unite', () => App);
AppRegistry.runApplication('unite', {
  rootTag: document.getElementById('root'),
});

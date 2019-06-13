
export class Navigation {

  static navigateTo(props, target) {
    props.history.push(target);
  }

  static navigateReplace(props, target) {
    props.history.replace(target);
  }

  static navigateBack(props) {
    props.history.goBack();
  }
}

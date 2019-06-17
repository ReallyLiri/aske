import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import BaseContainerComponent from "../infra/baseContainerComponent";


function bindActionsCreators(actions, dispatch) {
  let result = {};
  for (const actionsName in actions) {
    if (actions.hasOwnProperty(actionsName)) {
      result[actionsName] = bindActionCreators(actions[actionsName], dispatch);
    }
  }
  return result;
}

// Generic util to wrap redux connection of states and actions to component
export default function connectComponent(component) {
  console.assert(component.prototype instanceof BaseContainerComponent);
  return connect(state => ({
      ...BaseContainerComponent.mapStateToProps(state),
      ...component.mapStateToProps(state)
    }),
    (dispatch) => bindActionsCreators({
      ...BaseContainerComponent.mapDispatchToProps(),
      ...component.mapDispatchToProps()
    }, dispatch)
  )(component);
}

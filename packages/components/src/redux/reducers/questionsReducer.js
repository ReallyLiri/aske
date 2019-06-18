import * as actions from '../actions/actionTypes'
import Logging from '../../infra/logging'

const initialState = {
  completed: false,
  questions: null
};

export default function questions(state = initialState, action = {}) {
  switch (action.type) {
    case actions.MARK_QUESTIONS_COMPLETED:
      Logging.debug(`QuestionsReducer: Mark questions completed`);
      return {
        ...state,
        completed: true
      };
    case actions.SET_QUESTIONS:
      Logging.debug(`QuestionsReducer: Setting questions...`);
      Logging.debug(action.questions);
      return {
        ...state,
        questions: action.questions
      };
    case actions.CLEAR_QUESTIONS:
      Logging.debug(`QuestionsReducer: Clearing questions`);
      return {
        ...state,
        questions: null,
        completed: false
      };
    default:
      return state;
  }
}

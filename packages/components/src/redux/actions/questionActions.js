import * as types from './actionTypes'

export function markQuestionsCompleted() {
  return {
    type: types.MARK_QUESTIONS_COMPLETED
  };
}

export function setQuestions(questions) {
  return {
    type: types.SET_QUESTIONS,
    questions: questions
  };
}

export function clearQuestions(questions) {
  return {
    type: types.CLEAR_QUESTIONS
  };
}

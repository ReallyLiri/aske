
export const LEFT_ANSWER = 'LEFT';
export const RIGHT_ANSWER = 'RIGHT';
export const BOTH_ANSWERS = 'BOTH';
export const NONE_ANSWERS = 'NONE';

export function matchScore(response1, response2) {
  if (!response1 || !response2) {
    return 0;
  }
  if (response1 === response2) {
    return 1;
  }
  if (response1 === NONE_ANSWERS || response2 === NONE_ANSWERS) {
    return 0;
  }
  if (response1 === BOTH_ANSWERS || response2 === BOTH_ANSWERS) {
    return 0.5;
  }
  return 0;
}

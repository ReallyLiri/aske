import FireBase from "../infra/firebase";
const maxHeapFn = require('@datastructures-js/max-heap');

import {matchScore} from "../data/questionResponse"

const RESPONSES_COLLECTION = "responses";

export default class MatchingService {

  static calculateScore(responses1, responses2) {
    const minLength = Math.min(responses1.length, responses2.length);
    const maxLength = Math.max(responses1.length, responses2.length);
    let sum = 0;
    for (let i = 0; i<minLength; i++) {
      sum += matchScore(responses1[i].response, responses2[i].response);
    }
    return Math.floor(100*sum/maxLength);
  }

  static* orderedMatches(maxHeap, top) {
    top = Math.min(top, maxHeap.size());
    for (let i = 0; i<top; i++) {
      const maxNode = maxHeap.extractMax();
      const score = maxNode.getKey();
      const username = maxNode.getValue();
      yield {
        score: score,
        username: username
      }
    }
  }

  static async getMatches(username, top=10) {

    const allData = (await FireBase.getAll(RESPONSES_COLLECTION));
    const targetUserResponses = allData.find(data => data.id === username).responses;
    const maxHeap = maxHeapFn();

    allData.forEach(responsesItem => {
      if (responsesItem.id === username) {
        return;
      }
      const score = MatchingService.calculateScore(targetUserResponses, responsesItem.responses);
      if (score > 0) {
        maxHeap.insert(score, responsesItem.id);
      }
    });

    return Array.from(MatchingService.orderedMatches(maxHeap, top));
  }

}

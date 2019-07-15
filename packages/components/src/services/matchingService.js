import FireBase from "./firebase";
const maxHeapFn = require('@datastructures-js/max-heap');

import {matchScore} from "../data/questionResponse"

const USERS_COLLECTION = "users";

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
      const user = maxNode.getValue();
      yield {
        score: score,
        userData: user
      }
    }
  }

  static async getMatches(userId, top=10) {

    const allData = await FireBase.getAll(USERS_COLLECTION);
    const targetUserResponses = allData.find(data => data.id === userId).responses;
    const maxHeap = maxHeapFn();

    allData.forEach(doc => {
      if (doc.id === userId) {
        return;
      }
      const {responses} = doc;
      const score = MatchingService.calculateScore(targetUserResponses, responses);
      if (score > 0) {
        maxHeap.insert(score, doc.userData);
      }
    });

    return Array.from(MatchingService.orderedMatches(maxHeap, top));
  }

}

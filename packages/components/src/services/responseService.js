import FireBase from "./firebase";

const USERS_COLLECTION = "users";

export default class ResponseService {

  static async postResponses(userData, questions) {
    const mappedResponses = questions.map(
      q => {
        return {id: q.id, response: q.response}
      }
    );
    await FireBase.set(USERS_COLLECTION, userData.id, {userData: userData, responses: mappedResponses});
  }

}

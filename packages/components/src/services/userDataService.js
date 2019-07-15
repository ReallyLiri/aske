import FireBase from "./firebase";

const USERS_COLLECTION = "users";

export default class UserDataService {

  static async update(userData, questions) {
    const mappedResponses = questions && questions.length ? questions.map(
      q => {
        return {id: q.id, response: q.response}
      }
    ) : null;
    await FireBase.set(USERS_COLLECTION, userData.id, {userData: userData, responses: mappedResponses});
  }

  static async get(userId) {
    const result = await FireBase.get(USERS_COLLECTION, userId);
    return {
      userData: {...result.userData, id: userId},
      responses: result.responses
    }
  }

}

import FireBase from "../infra/firebase";

const USERS_COLLECTION = "users";

export default class UserDataService {

  static async update(userData) {
    await FireBase.set(USERS_COLLECTION, userData.username, {userData: userData});
  }

  static async get(username) {
    const result = await FireBase.get(USERS_COLLECTION, username);
    return {
      userData: result.userData
    }
  }

}

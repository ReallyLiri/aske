import FireBase from "./firebase";
import { Strings } from "../data/strings";

const USERS_COLLECTION = "users";

export default class AuthService {

  static async login(username) {
    const results = await FireBase.query(USERS_COLLECTION, 'username', username);
    if (!results || !results.length) {
      return {
        error: Strings.ERROR_LOGIN
      }
    }
    return {
      userData: results[0]
    };
  }

  static async register(userData) {
    const existing = await FireBase.query(USERS_COLLECTION, 'username', userData.username);
    if (existing && existing.length) {
      return {
        error: Strings.ERROR_REGISTER
      }
    }
    const userId = await FireBase.add(USERS_COLLECTION, userData);
    return {
      userData: {...userData, id: userId}
    };
  }

}

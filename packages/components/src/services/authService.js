import FireBase from "./firebase";
import { Strings } from "../data/strings";

const USERS_COLLECTION = "users";

export default class AuthService {

  static async login(username, password) {
    const results = await FireBase.query(USERS_COLLECTION, 'userData.username', username);
    if (!results || !results.length) {
      return {
        error: Strings.ERROR_LOGIN
      }
    }
    const result = results[0];
    if (result.userData.password !== password) {
      return {
        error: Strings.ERROR_LOGIN
      }
    }
    return {
      userData: {...results[0].userData, id: results[0].id},
      responses: results[0].responses
    };
  }

  static async register(userData) {
    const existing = await FireBase.query(USERS_COLLECTION, 'userData.username', userData.username);
    if (existing && existing.length) {
      return {
        error: Strings.ERROR_REGISTER
      }
    }
    const userId = await FireBase.add(USERS_COLLECTION, {userData: userData, responses: []});
    return {
      userData: {...userData, id: userId}
    };
  }

}

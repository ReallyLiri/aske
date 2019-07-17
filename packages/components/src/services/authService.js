import FireBase from "../infra/firebase";
import { Strings } from "../data/strings";
import { hashPassword } from "../infra/utils";

const AUTH_COLLECTION = "auth";

export default class AuthService {

  static async login(username, password) {
    password = hashPassword(password);
    const result = await FireBase.get(AUTH_COLLECTION, username);
    if (!result) {
      return {
        error: Strings.ERROR_LOGIN
      }
    }
    if (result.password !== password) {
      return {
        error: Strings.ERROR_LOGIN
      }
    }
    return {
      success: true
    };
  }

  static async register(username, password) {
    password = hashPassword(password);
    const existing = !!(await FireBase.get(AUTH_COLLECTION, username));
    if (existing) {
      return {
        error: Strings.ERROR_REGISTER
      }
    }
    await FireBase.set(AUTH_COLLECTION, username, {username: username, password: password});
    return {
      success: true
    };
  }

}

import { AsyncStorage } from "react-native-web";

const USER_KEY = 'USER_KEY';

export default class Storage {

  static async getUser() {
    return JSON.parse(await AsyncStorage.getItem(USER_KEY));
  }

  static async setUser(user) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static async clearUser() {
    await AsyncStorage.removeItem(USER_KEY);
  }

}

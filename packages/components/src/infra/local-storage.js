import { AsyncStorage } from "./async-storage";

const USERNAME_KEY = 'USERNAME_KEY';

export default class LocalStorage {

  // Basic funcs:

  static async get(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  }

  static async set(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async clear(key) {
    await AsyncStorage.removeItem(key);
  }

  // User:

  static async getUsername() {
    return LocalStorage.get(USERNAME_KEY);
  }

  static async setUsername(user) {
    await LocalStorage.set(USERNAME_KEY, user);
  }

  static async clearUsername() {
    await LocalStorage.clear(USERNAME_KEY);
  }

}

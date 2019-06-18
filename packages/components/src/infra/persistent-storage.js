import { AsyncStorage } from "./async-storage";

const USER_KEY = 'USER_KEY';
const QUESTIONS_KEY = 'QUESTIONS_KEY';

export default class PersistentStorage {

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

  static async getUser() {
    return PersistentStorage.get(USER_KEY);
  }

  static async setUser(user) {
    await PersistentStorage.set(USER_KEY, user);
  }

  static async clearUser() {
    await PersistentStorage.clear(USER_KEY);
  }

  // Questions:

  static async getQuestions() {
    return PersistentStorage.get(QUESTIONS_KEY);
  }

  static async setQuestions(questions) {
    await PersistentStorage.set(QUESTIONS_KEY, questions);
  }

  static async clearQuestions() {
    await PersistentStorage.clear(QUESTIONS_KEY);
  }

}

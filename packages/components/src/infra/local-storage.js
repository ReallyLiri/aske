import { AsyncStorage } from "./async-storage";

const USER_KEY = 'USER_KEY';
const QUESTIONS_KEY = 'QUESTIONS_KEY';

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

  static async getUser() {
    return LocalStorage.get(USER_KEY);
  }

  static async setUser(user) {
    await LocalStorage.set(USER_KEY, user);
  }

  static async clearUser() {
    await LocalStorage.clear(USER_KEY);
  }

  // Questions:

  static async getQuestions() {
    return LocalStorage.get(QUESTIONS_KEY);
  }

  static async setQuestions(questions) {
    await LocalStorage.set(QUESTIONS_KEY, questions);
  }

  static async clearQuestions() {
    await LocalStorage.clear(QUESTIONS_KEY);
  }

}

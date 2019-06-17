import { AsyncStorage } from "react-native-web";

const USER_KEY = 'USER_KEY';

export async function getUser() {
  return await AsyncStorage.getItem(USER_KEY);
}

export async function setUser(user) {
  await AsyncStorage.setItem(USER_KEY);
}

export async function clearUser() {
  await AsyncStorage.removeItem(USER_KEY);
}

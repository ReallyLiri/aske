import * as firebase from "firebase/app";
import "firebase/firestore";

export default class FireBase {

  static initialize() {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyB6wsCwhKWlkBHMx5jqI7PXkXV28qZpbPs",
        authDomain: "unite-d3b30.firebaseapp.com",
        databaseURL: "https://unite-d3b30.firebaseio.com",
        projectId: "unite-d3b30",
        storageBucket: "",
        messagingSenderId: "672071053188",
        appId: "1:672071053188:web:41c116b6f3ab9072"
      };
      firebase.initializeApp(firebaseConfig);
    }
  }

  static async get(collection, id) {
    const response = await firebase.firestore().collection(collection).doc(id).get();
    if (response.exists) {
      return response.data();
    }
    return null;
  }

  static async query(collection, field, value) {
    const response = await firebase.firestore().collection(collection)
      .where(field, "==", value).get();
    return response.docs.map(doc => doc.data());
  }

  static async set(collection, id, data) {
    await firebase.firestore().collection(collection).doc(id).set(data);
  }

  static async add(collection, data) {
    const response = await firebase.firestore().collection(collection).add(data);
    return response.id;
  }
}

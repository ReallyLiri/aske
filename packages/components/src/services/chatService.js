import * as firebase from "firebase/app";
import "firebase/firestore";
import { nowToTimestampUtc } from "../infra/utils";
import FireBase from "../infra/firebase";
import UserDataService from "./userDataService";

const CHANNELS = 'channels';
const MESSAGES = 'messages';

export default class ChatService {

  static async getOrCreateChannel(userData, contactUsername, setUserDataCallback) {
    const {channels} = userData;
    if (contactUsername in channels) {
      return channels[contactUsername];
    }
    const channelId = await ChatService.createChannel([userData.username, contactUsername]);
    channels[contactUsername] = channelId;
    userData.channels = channels;
    await UserDataService.update(userData);
    setUserDataCallback(userData);
    return channelId;
  }

  static async createChannel(usernames) {
    const channelId = await FireBase.add(CHANNELS, {usernames: usernames});
    return channelId;
  }

  static messagesCollection(channelId) {
    return firebase.firestore().collection(CHANNELS).doc(channelId).collection(MESSAGES);
  }

  static async latestMessages(channelId, username, limit) {
    const messagesCollection = ChatService.messagesCollection(channelId);
    const messages = (
      await messagesCollection
        .limit(limit)
        .orderBy('timestamp', 'desc')
        .get()
    ).docs.map(doc => {return {...doc.data(), id: doc.id}}).reverse();
    messages.forEach(message => {
      ChatService.markMessageRead(channelId, message, username);
    });
    return messages;
  }

  static registerForNewMessages(channelId, username, listenerRef, onNewMessage) {
    const messages = ChatService.messagesCollection(channelId);
    const unsubscribe = messages.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const message = {...change.doc.data(), id: change.doc.id};
          if (message.source !== username) {
            ChatService.markMessageRead(channelId, message, username);
          }
          onNewMessage(listenerRef, message);
        }
      })
    });
    return unsubscribe;
  }

  static async markMessageRead(channelId, message, username) {
    if (username in message.seenBy) {
      return;
    }
    message.seenBy.push(username);
    const messagesCollection = ChatService.messagesCollection(channelId);
    await messagesCollection.doc(message.id).set(message);
  }

  static async publishMessage(channelId, sourceUsername, text) {
    const messagesCollection = ChatService.messagesCollection(channelId);
    await messagesCollection.add({
      source: sourceUsername,
      text: text,
      timestamp: nowToTimestampUtc(),
      seenBy: [sourceUsername]
    });
  }

}

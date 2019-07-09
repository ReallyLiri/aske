import * as firebase from "firebase/app";
import "firebase/firestore";
import { maxStr, minStr, nowToTimestampUtc } from "../infra/utils";

const CHANNELS = 'channels';
const MESSAGES = 'messages';

export default class ChatService {

  static channel(id1, id2) {
    return `${minStr(id1, id2)}-${maxStr(id1, id2)}`;
  }

  static messagesCollection(id1, id2) {
    const channel = ChatService.channel(id1, id2);
    return firebase.firestore().collection(CHANNELS).doc(channel).collection(MESSAGES);
  }

  static async latestMessages(myId, contactId, limit) {
    const messages = ChatService.messagesCollection(myId, contactId);
    return (
      await messages
        .limit(limit)
        .orderBy('timestamp', 'desc')
        .get()
    ).docs.map(doc => doc.data()).reverse();
  }

  static register(myId, contactId, ref, onNewMessage) {
    const messages = ChatService.messagesCollection(myId, contactId);
    const unsubscribe = messages.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          onNewMessage(ref, {...change.doc.data(), id: change.doc.id});
        }
      })
    });
    return unsubscribe;
  }

  static async publish(myId, contactId, text) {
    const messages = ChatService.messagesCollection(myId, contactId);
    await messages.add({
      owner: myId,
      target: contactId,
      text: text,
      timestamp: nowToTimestampUtc()
    });
  }

}

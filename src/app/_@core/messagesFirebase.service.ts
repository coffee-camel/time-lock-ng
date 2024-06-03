import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

export interface Message {
  id?: string;
  uid?: string;
  title: string;
  content: string;
  delayInMinutes: number;
  lastModified?: Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class MessagesFirebaseService {
  firestore = inject(Firestore);
  messagesCollection = collection(this.firestore, 'messages');

  constructor() {}

  getMessages(uid: string): Observable<Message[]> {
    const q = query(this.messagesCollection, where('uid', '==', uid));

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Message[]>;
  }

  addMessage(
    uid: string,
    title: string,
    content: string,
    delayInMinutes: number
  ): Observable<string> {
    const messageToCreate = {
      uid,
      title,
      content,
      delayInMinutes,
    };
    const promise = addDoc(this.messagesCollection, messageToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  editMessage(
    messageId: string,
    dataToUpdate: { title: string; content: string; delayInMinutes: number }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + messageId);
    const promise = setDoc(docRef, dataToUpdate, { merge: true });
    return from(promise);
  }

  removeMessage(messageId: string | undefined): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + messageId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  getMessage(messageId: string) {
    const docRef = doc(this.firestore, 'messages/' + messageId);
    const promise = getDoc(docRef);
    return from(promise);
  }
}

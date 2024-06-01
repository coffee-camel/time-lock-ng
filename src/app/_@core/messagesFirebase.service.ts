import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';

export interface Message {
  id?: string;
  userId?: string;
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

  constructor(private authService: AuthService) {}

  getMessages(): Observable<Message[]> {
    return collectionData(this.messagesCollection, {
      idField: 'id',
    }) as Observable<Message[]>;
  }

  addMessage(
    title: string,
    content: string,
    delayInMinutes: number
  ): Observable<string> {
    const messageToCreate = {
      title,
      content,
      delayInMinutes,
    };
    const promise = addDoc(this.messagesCollection, messageToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  removeMessage(messageId: string): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + messageId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  // getMessage(messageId: string): Observable<Message> {
  //   const docRef = doc(this.firestore, 'messages/' + messageId);
  //   const promise = getDoc(docRef);
  //   // return from(promise);
  // }
}

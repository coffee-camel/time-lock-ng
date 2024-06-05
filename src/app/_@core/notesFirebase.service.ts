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
import { EncryptionService } from './encryption.service';

export interface Note {
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
export class NotesFirebaseService {
  encryption = inject(EncryptionService);
  firestore = inject(Firestore);
  notesCollection = collection(this.firestore, 'messages');

  constructor() {}

  getNotes(uid: string): Observable<Note[]> {
    const q = query(this.notesCollection, where('uid', '==', uid));

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Note[]>;
  }

  addNote(
    uid: string,
    title: string,
    content: string,
    delayInMinutes: number
  ): Observable<string> {
    const noteToCreate = {
      uid,
      title,
      content: this.encryption.encrypt(content),
      delayInMinutes,
    };
    const promise = addDoc(this.notesCollection, noteToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  editNote(
    noteId: string,
    dataToUpdate: { title: string; content: string; delayInMinutes: number }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + noteId);
    const promise = setDoc(docRef, dataToUpdate, { merge: true });
    return from(promise);
  }

  removeNote(noteId: string | undefined): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + noteId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  getNote(noteId: string) {
    const docRef = doc(this.firestore, 'messages/' + noteId);
    const promise = getDoc(docRef);
    return from(promise);
  }
}

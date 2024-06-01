import { Injectable } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

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
export class MessageService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Create a new message
  async createMessage(title: string, content: string, delayInMinutes: number) {}

  // Get all messages for the current user
  async getMessages() {}

  // Get a message by ID
  async getMessageById(messageId: string) {}
}

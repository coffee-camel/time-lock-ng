import { Injectable } from '@angular/core';
import { environment } from '_@environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  encrypt(data: any) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      environment.secretKey
    ).toString();
  }

  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, environment.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}

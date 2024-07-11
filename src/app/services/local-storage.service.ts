import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // set local storage values
  setItem(key: string, value: any): void {
    try {
      if (key) {
        localStorage.setItem(key, value);
      } else {
        throw new Error("Local Storage key cannot be Null or Undefined");
      }
    } catch (error) {
      console.error("Local Storage Set Item Key Is Not Found", error);
    }
  }

  // get details from local storage
  getItem(key: string): any {
    try {
      if (key) {
        const value = localStorage.getItem(key);
        return value;
      } else {
        throw new Error("Local Storage key cannot be Null or Undefined");
      }
    } catch (error) {
      console.error("Local Storage get Item Key Is Not Found", error);
    }
  }

  // remove local storage values
  removeItem(key: string): void {
    try {
      if (key) {
        localStorage.removeItem(key);
      } else {
        throw new Error("Local Storage key cannot be Null or Undefined");
      }
    } catch (error) {
      console.error("Local Storage Remove Item Key Is Not Found", error);
    }
  }

  // clear local storage all values
  clearLocalStorage(): void {
    localStorage.clear();
  }

}

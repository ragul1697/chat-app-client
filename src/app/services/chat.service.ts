import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly API_BASE_URL: string = 'https://ancient-sands-50709-d78d7a043df6.herokuapp.com';
  private socket = io(this.API_BASE_URL);

  constructor(private http: HttpClient) { }

  public getUserMessages(body: any) {
    const url = `${this.API_BASE_URL}/chat/messages`;
    return this.http.post(url, body);
  }

  sendMessage(body: any) {
    this.socket.emit('message', body);
  }

  public getMessages() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

}

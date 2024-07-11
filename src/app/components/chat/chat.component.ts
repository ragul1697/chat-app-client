import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChatService } from '../../services/chat.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  userList: any[] = [];

  public loggedInUsername: string = '';
  public selectedUser: any;

  public messageFormControl = new FormControl<string | null>(null);

  public receivedMessages: any[] = [];

  constructor(private adminService: AdminService, private router: Router, private storageService: LocalStorageService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.loggedInUsername = this.storageService.getItem('loggedInUser');
    this.getAllUsers();
    this.getChatMessages();
  }

  private getChatMessages() {
    this.chatService.getMessages().subscribe({
      next: (response: any) => {
        if (response && response !== null) {
          this.receivedMessages.push(response);
        }
      }
    });
  }

  private getAllUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (response: any) => {
        if (response && response !== null) {
          this.userList = response.data;
        }
        else {
          this.userList = [];
        }
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => {
        this.userList = this.userList.filter(x => x.username !== this.loggedInUsername);
      }
    });
  }

  public onUserClick(user: any) {
    this.selectedUser = user;
  }

  public onSendMessageClick() {
    if (this.messageFormControl.value === null) {
      window.alert('Please type some text');
    }
    else {
      const sendMessageBody: any = {
        sender: this.loggedInUsername,
        receiver: this.selectedUser.username,
        content: this.messageFormControl.value
      }
      this.chatService.sendMessage(sendMessageBody);
      this.messageFormControl.setValue(null);
    }
  }

  public onLogoutClick() {
    this.router.navigate(['login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  public loggedInUsername: string = '';
  userList: any[] = [];

  constructor(private adminService: AdminService, private router: Router, private storageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loggedInUsername = this.storageService.getItem('loggedInUser');
    this.getAllUsers();
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

  public onLogoutClick() {
    this.router.navigate(['login']);
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUser, LoginService, RegisterUserModel } from '../../services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null)
  });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private storageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public onLoginClick() {
    if (this.loginFormGroup.valid) {
      this.loginUser();
    }
    else {
      this.loginFormGroup.markAllAsTouched();
    }
  }

  private loginUser() {
    const requestBody: LoginUser = {
      username: this.loginFormGroup.controls['username'].value,
      password: this.loginFormGroup.controls['password'].value,
    }
    this.loginService.authenticateUser(requestBody).subscribe({
      next: (response: any) => {
        if (response && response.status === 1) {
          this.storageService.setItem('loggedInUser', requestBody.username);
          if (response.data.isAdmin) {
            this.router.navigate(['admin']);
          }
          else {
            this.router.navigate(['chat']);
          }
        }
        else {
          console.log('Login unsuccessful');
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  public showErrorMessages(controlName: string) {
    return this.loginFormGroup.controls[controlName].touched && this.loginFormGroup.controls[controlName].hasError('required') ? 'Required' : '';
  }


  public onRegisterClick() {
    let username = window.prompt('Username');
    let password = window.prompt('Password');
    let admin = window.confirm('Admin');
    const requestBody: RegisterUserModel = {
      username: username,
      password: password,
      isAdmin: admin
    }
    this.loginService.registerUser(requestBody).subscribe({
      next: (response: any) => {
        if (response && response !== null) {
          console.log('New User Added', response);
        } else {
          console.log('User details not saved');
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

}

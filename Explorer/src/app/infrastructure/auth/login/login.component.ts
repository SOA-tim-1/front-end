import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isDisabled: boolean = false;

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      Username: this.loginForm.value.username || '',
      Password: this.loginForm.value.password || '',
    };

    if (this.loginForm.valid) {
      this.isDisabled = true;
      this.authService.login(login).subscribe({
        next: () => {
          /*if (this.authService.user$.value.role === 'tourist') {
            this.router.navigate(['/user-location']);
          } else {
            this.router.navigate(['/']);
          }*/
          this.router.navigate(['/']);
          this.toastr.success('Login successful');
          this.isDisabled = false;
        },
        error: (err) => {
          this.toastr.error('Please try again', 'Login failed');
          this.isDisabled = false;
        },
      });
    } else {
      this.toastr.error('Please enter username and password');
    }
  }
}

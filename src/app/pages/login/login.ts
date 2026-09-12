import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StatusBar } from '../../shared/status-bar/status-bar';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, StatusBar],
  templateUrl: './login.html',
  styleUrl: '../signup/signup.scss',
})
export class Login {
  private router = inject(Router);
  private state = inject(AppState);

  email = '';
  password = '';

  get canSubmit() {
    return this.email.trim().length > 3 && this.password.trim().length > 0;
  }

  submit() {
    if (!this.canSubmit) return;
    this.state.login(this.email.trim());
    this.router.navigateByUrl('/home');
  }

  socialLogin() {
    this.state.login('valentina@example.com');
    this.router.navigateByUrl('/home');
  }
}

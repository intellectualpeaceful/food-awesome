import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StatusBar } from '../../shared/status-bar/status-bar';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, StatusBar],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private router = inject(Router);
  private state = inject(AppState);

  name = '';
  surname = '';
  email = '';

  get canSubmit() {
    return this.name.trim().length > 0 && this.email.trim().length > 3;
  }

  submit() {
    if (!this.canSubmit) return;
    this.state.signup({ name: this.name.trim(), surname: this.surname.trim(), email: this.email.trim() });
    this.router.navigateByUrl('/home');
  }

  socialSignup() {
    if (!this.name) this.name = 'Valentina';
    this.state.signup({ name: this.name || 'Valentina', surname: this.surname, email: this.email || 'valentina@example.com' });
    this.router.navigateByUrl('/home');
  }
}

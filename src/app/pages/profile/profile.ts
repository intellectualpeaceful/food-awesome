import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  state = inject(AppState);
  private router = inject(Router);

  logout() {
    this.state.logout();
    this.router.navigateByUrl('/');
  }
}

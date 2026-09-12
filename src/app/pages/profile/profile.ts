import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../core/app-state';
import { StatusBar } from '../../shared/status-bar/status-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, StatusBar],
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

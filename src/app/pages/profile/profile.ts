import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../core/app-state';
import { StatusBar } from '../../shared/status-bar/status-bar';
import { HeroShrink } from '../../shared/hero-shrink/hero-shrink';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, StatusBar, HeroShrink],
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

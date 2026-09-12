import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/home" routerLinkActive="active" class="nav-item" aria-label="Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L12 4l9 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10v9a1 1 0 001 1H9a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2.5a1 1 0 001-1v-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <a routerLink="/shopping-list" routerLinkActive="active" class="nav-item" aria-label="Shopping list">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h2l1.4 10.6a1.8 1.8 0 001.8 1.6h8.6a1.8 1.8 0 001.78-1.5L20 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="21" r="1.2" fill="currentColor"/><circle cx="16.5" cy="21" r="1.2" fill="currentColor"/></svg>
        @if (state.shoppingCount() > 0) {
          <span class="badge">{{ state.shoppingCount() }}</span>
        }
      </a>
      <a routerLink="/favorites" routerLinkActive="active" class="nav-item" aria-label="Favorites">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 20.5l-1.45-1.32C5.4 14.86 2 11.77 2 8.02 2 4.93 4.42 2.5 7.5 2.5c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0116.5 2.5C19.58 2.5 22 4.93 22 8.02c0 3.75-3.4 6.84-8.55 11.17L12 20.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </a>
      <a routerLink="/profile" routerLinkActive="active" class="nav-item" aria-label="Profile">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20c1.3-3.6 4.2-5.5 7.5-5.5s6.2 1.9 7.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </a>
    </nav>
  `,
  styles: [
    `
      .bottom-nav {
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: var(--peach);
        padding: 16px 10px calc(16px + env(safe-area-inset-bottom));
        z-index: 20;
      }
      .nav-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 34px;
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.75);
        transition: color 0.15s ease;
      }
      .nav-item.active {
        color: #fff;
        box-shadow: inset 0 -3px 0 #fff;
      }
      .badge {
        position: absolute;
        top: -2px;
        right: 2px;
        background: var(--teal-dark);
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        min-width: 16px;
        height: 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 3px;
      }
    `,
  ],
})
export class BottomNav {
  constructor(public state: AppState) {}
}

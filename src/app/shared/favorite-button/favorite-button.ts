import { Component, Input } from '@angular/core';
import { AppState } from '../../core/app-state';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  template: `
    <button
      class="fav-btn"
      [class.active]="state.isFavorite(recipeId)"
      (click)="onClick($event)"
      aria-label="Toggle favorite"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" [attr.fill]="state.isFavorite(recipeId) ? 'currentColor' : 'none'">
        <path
          d="M12 20.5l-1.45-1.32C5.4 14.86 2 11.77 2 8.02 2 4.93 4.42 2.5 7.5 2.5c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0116.5 2.5C19.58 2.5 22 4.93 22 8.02c0 3.75-3.4 6.84-8.55 11.17L12 20.5z"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `,
  styles: [
    `
      .fav-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--peach-dark);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        transition: transform 0.15s ease;
      }
      .fav-btn:active {
        transform: scale(0.88);
      }
      .fav-btn.active {
        color: #e8574a;
      }
    `,
  ],
})
export class FavoriteButton {
  @Input({ required: true }) recipeId!: string;

  constructor(public state: AppState) {}

  onClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.state.toggleFavorite(this.recipeId);
  }
}

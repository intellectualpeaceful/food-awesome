import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppState } from '../../core/app-state';
import { RecipeData } from '../../core/recipe-data';
import { FavoriteButton } from '../../shared/favorite-button/favorite-button';
import { HeroShrink } from '../../shared/hero-shrink/hero-shrink';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, FavoriteButton, HeroShrink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  state = inject(AppState);
  private data = inject(RecipeData);

  favoriteRecipes = computed(() =>
    this.data.recipes.filter((r) => this.state.favoriteIds().has(r.id)),
  );
}

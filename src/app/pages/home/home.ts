import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppState } from '../../core/app-state';
import { RecipeData } from '../../core/recipe-data';
import { StatusBar } from '../../shared/status-bar/status-bar';
import { FavoriteButton } from '../../shared/favorite-button/favorite-button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, StatusBar, FavoriteButton],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  state = inject(AppState);
  data = inject(RecipeData);

  categories = this.data.categories;
  newRecipes = this.data.getNewRecipes();

  query = '';

  get filteredRecipes() {
    return this.query ? this.data.searchRecipes(this.query) : [];
  }
}

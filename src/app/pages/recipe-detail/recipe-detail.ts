import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RecipeData } from '../../core/recipe-data';
import { AppState } from '../../core/app-state';
import { FavoriteButton } from '../../shared/favorite-button/favorite-button';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [FavoriteButton],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  private route = inject(ActivatedRoute);
  private data = inject(RecipeData);
  private location = inject(Location);
  state = inject(AppState);

  goBack() {
    this.location.back();
  }

  private recipeId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id')!)), {
    initialValue: this.route.snapshot.paramMap.get('id')!,
  });

  get recipe() {
    return this.data.getRecipe(this.recipeId());
  }

  addAll() {
    if (this.recipe) this.state.addAllIngredients(this.recipe);
  }

  toggleIngredient(name: string, qty: string) {
    if (this.state.isInShoppingList(name)) {
      this.state.removeIngredient(name);
    } else {
      this.state.addIngredient(name, qty);
    }
  }
}

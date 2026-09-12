import { Injectable } from '@angular/core';
import { CATEGORIES, NEW_RECIPE_IDS, RECIPES } from './mock-data';
import { Category, Recipe } from './models';

@Injectable({ providedIn: 'root' })
export class RecipeData {
  readonly categories: Category[] = CATEGORIES;
  readonly recipes: Recipe[] = RECIPES;

  getCategory(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find((r) => r.id === id);
  }

  getRecipesByCategory(categoryId: string): Recipe[] {
    return this.recipes.filter((r) => r.categoryId === categoryId);
  }

  getNewRecipes(): Recipe[] {
    return NEW_RECIPE_IDS.map((id) => this.getRecipe(id)).filter((r): r is Recipe => !!r);
  }

  searchRecipes(query: string): Recipe[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.recipes.filter(
      (r) => r.name.toLowerCase().includes(q) || r.shortDesc.toLowerCase().includes(q),
    );
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RecipeData } from '../../core/recipe-data';
import { FavoriteButton } from '../../shared/favorite-button/favorite-button';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, FavoriteButton],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  private route = inject(ActivatedRoute);
  private data = inject(RecipeData);

  private categoryId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id')!)), {
    initialValue: this.route.snapshot.paramMap.get('id')!,
  });

  get category() {
    return this.data.getCategory(this.categoryId());
  }

  get recipes() {
    return this.data.getRecipesByCategory(this.categoryId());
  }
}

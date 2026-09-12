import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppState } from '../../core/app-state';
import { HeroShrink } from '../../shared/hero-shrink/hero-shrink';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [RouterLink, HeroShrink],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
})
export class ShoppingList {
  state = inject(AppState);

  allChecked = computed(() => {
    const list = this.state.shoppingList();
    return list.length > 0 && list.every((i) => i.checked);
  });

  selectAll() {
    this.state.selectAllShopping(true);
  }

  deselectAll() {
    this.state.selectAllShopping(false);
  }
}

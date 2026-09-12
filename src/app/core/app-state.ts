import { Injectable, computed, signal } from '@angular/core';
import { AppUser, Recipe, ShoppingItem } from './models';

const STORAGE_KEY = 'food-awesome-state';

interface PersistedState {
  user: AppUser | null;
  isLoggedIn: boolean;
  favoriteIds: string[];
  shoppingList: ShoppingItem[];
  newsletter: boolean;
  profiling: boolean;
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : null;
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AppState {
  private readonly initial = loadState();

  readonly user = signal<AppUser | null>(this.initial?.user ?? null);
  readonly isLoggedIn = signal<boolean>(this.initial?.isLoggedIn ?? false);
  readonly favoriteIds = signal<Set<string>>(new Set(this.initial?.favoriteIds ?? []));
  readonly shoppingList = signal<ShoppingItem[]>(this.initial?.shoppingList ?? []);
  readonly newsletter = signal<boolean>(this.initial?.newsletter ?? true);
  readonly profiling = signal<boolean>(this.initial?.profiling ?? false);

  readonly favoriteCount = computed(() => this.favoriteIds().size);
  readonly shoppingCount = computed(() => this.shoppingList().filter((i) => !i.checked).length);

  constructor() {
    // persist to localStorage whenever anything relevant changes
    const persist = () => {
      const state: PersistedState = {
        user: this.user(),
        isLoggedIn: this.isLoggedIn(),
        favoriteIds: Array.from(this.favoriteIds()),
        shoppingList: this.shoppingList(),
        newsletter: this.newsletter(),
        profiling: this.profiling(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* ignore quota / privacy-mode errors */
      }
    };

    // simple manual persistence hook, called after every mutating method below
    this.persist = persist;
  }

  private persist: () => void = () => {};

  signup(user: AppUser) {
    this.user.set(user);
    this.isLoggedIn.set(true);
    this.persist();
  }

  login(email: string) {
    const existing = this.user();
    this.user.set(existing ?? { name: 'Valentina', surname: '', email });
    this.isLoggedIn.set(true);
    this.persist();
  }

  logout() {
    this.isLoggedIn.set(false);
    this.persist();
  }

  isFavorite(recipeId: string): boolean {
    return this.favoriteIds().has(recipeId);
  }

  toggleFavorite(recipeId: string) {
    const next = new Set(this.favoriteIds());
    if (next.has(recipeId)) {
      next.delete(recipeId);
    } else {
      next.add(recipeId);
    }
    this.favoriteIds.set(next);
    this.persist();
  }

  isInShoppingList(name: string): boolean {
    return this.shoppingList().some((i) => i.name === name);
  }

  addIngredient(name: string, qty: string) {
    if (this.isInShoppingList(name)) return;
    this.shoppingList.update((list) => [
      ...list,
      { id: `${name}-${Date.now()}`, name, qty, checked: false },
    ]);
    this.persist();
  }

  removeIngredient(name: string) {
    this.shoppingList.update((list) => list.filter((i) => i.name !== name));
    this.persist();
  }

  addAllIngredients(recipe: Recipe) {
    const existingNames = new Set(this.shoppingList().map((i) => i.name));
    const additions = recipe.ingredients
      .filter((ing) => !existingNames.has(ing.name))
      .map((ing) => ({ id: `${ing.name}-${Date.now()}-${Math.random()}`, name: ing.name, qty: ing.qty, checked: false }));
    this.shoppingList.update((list) => [...list, ...additions]);
    this.persist();
  }

  toggleShoppingItem(id: string) {
    this.shoppingList.update((list) =>
      list.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    );
    this.persist();
  }

  deleteShoppingItem(id: string) {
    this.shoppingList.update((list) => list.filter((i) => i.id !== id));
    this.persist();
  }

  selectAllShopping(checked: boolean) {
    this.shoppingList.update((list) => list.map((i) => ({ ...i, checked })));
    this.persist();
  }

  setNewsletter(value: boolean) {
    this.newsletter.set(value);
    this.persist();
  }

  setProfiling(value: boolean) {
    this.profiling.set(value);
    this.persist();
  }
}

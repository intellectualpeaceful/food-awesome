import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
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
export class Home implements AfterViewInit {
  state = inject(AppState);
  data = inject(RecipeData);

  categories = this.data.categories;
  newRecipes = this.data.getNewRecipes();

  query = '';

  // the carousel renders 3 back-to-back copies of the categories so the
  // track always has room to scroll past either edge; once the user settles
  // on a card inside the first or third copy we silently re-center the
  // equivalent card in the middle copy, which reads as an infinite loop
  private readonly setSize = this.categories.length;
  loopedCategories = [...this.categories, ...this.categories, ...this.categories];

  // raw index into loopedCategories (0..3*setSize - 1)
  activeIndex = signal(this.setSize);

  // true only for the one frame where we silently re-center into the middle
  // copy, so the lift/unlift CSS transition doesn't play during that jump
  jumping = signal(false);

  @ViewChild('carousel') private carouselRef?: ElementRef<HTMLDivElement>;
  @ViewChildren('card') private cardRefs?: QueryList<ElementRef<HTMLElement>>;

  private scrollRaf = 0;
  private settleTimeout?: ReturnType<typeof setTimeout>;

  get filteredRecipes() {
    return this.query ? this.data.searchRecipes(this.query) : [];
  }

  get dotIndex() {
    return this.activeIndex() % this.setSize;
  }

  ngAfterViewInit() {
    // start centered on the first card of the middle copy, no animation
    requestAnimationFrame(() => {
      this.jumpTo(this.setSize, 'instant');
    });
    this.cardRefs?.changes.subscribe(() => {
      requestAnimationFrame(() => this.updateActiveCard());
    });
  }

  onCarouselScroll() {
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => this.updateActiveCard());

    clearTimeout(this.settleTimeout);
    this.settleTimeout = setTimeout(() => this.normalizeLoop(), 120);
  }

  private updateActiveCard() {
    const container = this.carouselRef?.nativeElement;
    const cards = this.cardRefs?.toArray();
    if (!container || !cards || cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
      const el = card.nativeElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    if (this.activeIndex() !== closestIndex) {
      this.activeIndex.set(closestIndex);
    }
  }

  /** once scrolling has settled, snap invisibly back into the middle copy if we drifted into a clone */
  private normalizeLoop() {
    const raw = this.activeIndex();
    if (raw < this.setSize) {
      this.jumpTo(raw + this.setSize, 'instant');
    } else if (raw >= this.setSize * 2) {
      this.jumpTo(raw - this.setSize, 'instant');
    }
  }

  private jumpTo(rawIndex: number, behavior: ScrollBehavior) {
    const el = this.cardRefs?.toArray()[rawIndex]?.nativeElement;
    if (!el) return;

    if (behavior === 'instant') {
      // freeze the lift transition so swapping which clone is "active"
      // doesn't visibly drop/raise a card while we reposition
      this.jumping.set(true);
    }

    el.scrollIntoView({ inline: 'center', block: 'nearest', behavior });
    this.activeIndex.set(rawIndex);

    if (behavior === 'instant') {
      // let the jump paint with transitions off, then hand control back
      // to CSS for the next user-driven swipe
      requestAnimationFrame(() => requestAnimationFrame(() => this.jumping.set(false)));
    }
  }
}

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

  activeIndex = signal(0);

  @ViewChild('carousel') private carouselRef?: ElementRef<HTMLDivElement>;
  @ViewChildren('card') private cardRefs?: QueryList<ElementRef<HTMLElement>>;

  private scrollRaf = 0;

  get filteredRecipes() {
    return this.query ? this.data.searchRecipes(this.query) : [];
  }

  ngAfterViewInit() {
    // let layout settle before measuring card positions
    requestAnimationFrame(() => this.updateActiveCard());
    this.cardRefs?.changes.subscribe(() => {
      requestAnimationFrame(() => this.updateActiveCard());
    });
  }

  onCarouselScroll() {
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => this.updateActiveCard());
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
}

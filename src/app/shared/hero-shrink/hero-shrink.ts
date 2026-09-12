import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

/**
 * Keeps the host element's own look intact but shrinks it slightly (a
 * few %) as the nearest scrolling ancestor (.shell-content) scrolls,
 * mimicking the iOS "large title collapses a little" header behavior.
 * Pair with `position: sticky; top: 0;` on the host in its own styles.
 */
@Directive({
  selector: '[appHeroShrink]',
  standalone: true,
})
export class HeroShrink implements AfterViewInit, OnDestroy {
  private scrollParent: HTMLElement | null = null;
  private ticking = false;

  private readonly onScroll = () => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const top = this.scrollParent?.scrollTop ?? 0;
      const progress = Math.min(top / 90, 1);
      const scale = 1 - progress * 0.06;
      const el = this.el.nativeElement;
      el.style.setProperty('--hero-scale', scale.toFixed(3));
      el.classList.toggle('is-scrolled', top > 4);
      this.ticking = false;
    });
  };

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.scrollParent = this.el.nativeElement.closest('.shell-content');
    this.scrollParent?.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy() {
    this.scrollParent?.removeEventListener('scroll', this.onScroll);
  }
}

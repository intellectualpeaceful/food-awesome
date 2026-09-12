import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  template: `
    <div class="status-bar" [class.on-dark]="dark">
      <span>9:41</span>
      <div class="icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"/><rect x="5" y="5" width="3" height="7" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 10.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" fill="currentColor"/><path d="M4.6 7.4a4.8 4.8 0 016.8 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M1.8 4.7a8.7 8.7 0 0112.4 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="16" height="8" rx="1.3" fill="currentColor"/><rect x="21.5" y="4" width="1.7" height="4" rx="0.8" fill="currentColor"/></svg>
      </div>
    </div>
  `,
  styles: [
    `
      .status-bar {
        color: #1c1c1c;
      }
      .status-bar.on-dark {
        color: #fff;
      }
      .icons {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    `,
  ],
})
export class StatusBar {
  @Input() dark = false;
}

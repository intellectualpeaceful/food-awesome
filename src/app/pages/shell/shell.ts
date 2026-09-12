import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from '../../shared/bottom-nav/bottom-nav';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, BottomNav],
  template: `
    <div class="app-frame shell">
      <div class="shell-content scroll-hide">
        <router-outlet />
      </div>
      <app-bottom-nav />
    </div>
  `,
  styles: [
    `
      .shell {
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 0;
      }
      .shell-content {
        flex: 1;
        overflow-y: auto;
      }
    `,
  ],
})
export class Shell {}

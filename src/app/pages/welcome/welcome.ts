import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBar } from '../../shared/status-bar/status-bar';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, StatusBar],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {}

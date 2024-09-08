import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatIcon, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  activePage: string = 'dashboard'; // Initialize with default active page

  constructor(private router: Router) {}

  // Set the active page and navigate to the respective route
  setActive(page: string) {
    this.activePage = page;
    this.router.navigate([`/${page}`]);
  }
}

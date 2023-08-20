import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  isMenuVisible = false;
  currentRoute: string = ''; // Track the current route

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  faBars = faBars;

  // Subscribe to router events to update the current route
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Update current route when navigation changes
      }
    });
  }
}
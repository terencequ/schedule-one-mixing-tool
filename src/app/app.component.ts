import {Component, HostListener} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {NgForOf, NgIf} from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenav, MatSidenavContent, MatListItem, MatNavList, RouterLink, MatIconButton, MatIcon, MatToolbar, NgIf, MatMenuTrigger, MatMenu, MatMenuItem, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  navIsPhone: boolean = false;

  links: { name: string; url: string }[] = [
    {name: 'Optimiser', url: 'optimiser'},
    {name: 'Mixer', url: 'mixer'},
    {name: 'Ingredients', url: 'ingredients'},
    {name: 'Effects', url: 'effects'},
  ];

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.navIsPhone = window.innerWidth <= 1500;
  }

}

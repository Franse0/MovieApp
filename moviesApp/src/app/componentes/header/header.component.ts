import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent   {


  navOpen = false;
  myListOpen = false;

  constructor(private router: Router, private elementRef:ElementRef) { }

  closeNavAndList(): void {
    this.navOpen = false;
    this.myListOpen = false;
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
    this.myListOpen = false;
  }

  toggleList(): void {
    this.navOpen = false;
    this.myListOpen = !this.myListOpen;
  }

}

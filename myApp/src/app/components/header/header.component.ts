import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    username: string = "Steve956";
    password: string;
    port: number;

  constructor() { }

  ngOnInit() {

  }
}

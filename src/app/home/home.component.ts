// TODO: read:
// https://angular.io/guide/architecture
// https://angular.io/guide/glossary

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  githubRepo = 'https://github.com/BadassBison/game-site';

  constructor() { }

  ngOnInit(): void {
  }

}

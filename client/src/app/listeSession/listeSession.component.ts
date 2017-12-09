import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-session',
  templateUrl: './listeSession.component.html',
  styleUrls: ['./listeSession.component.css']
})
export class ListeSessionComponent implements OnInit {

  constructor () {}

  public listeSessions: Session[];

  public ngOnInit(): void {
    // Recuperer la liste des sessions sur le server depuis la bdd -> this.listeSessions
    console.log('INIT !');
  }
}

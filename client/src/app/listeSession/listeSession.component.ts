import { ListeSessionService } from './listeSessionService.service';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-liste-session',
    templateUrl: './listeSession.component.html',
    styleUrls: ['./listeSession.component.css']
})
export class ListeSessionComponent implements OnInit {

    public listeSessions: Session[] = new Array();

    constructor (private router: Router, private listeSessionService: ListeSessionService) {}

    public ngOnInit(): void {

        setInterval(() => {
            this.listeSessionService.obtenirListeSessions()
            .then((sessions: Session[]) => { this.listeSessions = sessions; });
        }, 1000);
  }

    public creerSessionClick(): void {
        this.router.navigateByUrl('/creationSession');
    }
}

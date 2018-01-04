import { AuthService } from './../authentification/authService.service';
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

    public nbreElementsParPage = 9;
    public recherche: string;
    public listeSessions: Session[] = new Array();

    constructor (private router: Router, private listeSessionService: ListeSessionService,
                private authService: AuthService) {}

    public ngOnInit(): void {

        setInterval(() => {
            this.listeSessionService.obtenirListeSessions()
            .then((sessions: Session[]) => { this.listeSessions = sessions; });
        }, 1000);
  }

    public creerSessionClick(): void {
        this.router.navigateByUrl('/creationSession');
    }

    public estConnecte(): boolean {
        return this.authService.isAuthenticated();
    }
}

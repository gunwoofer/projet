import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-liste-session',
    templateUrl: './creationSession.component.html',
    styleUrls: ['./creationSession.component.css']
})
export class CreationSessionComponent {

    constructor (private router: Router) {}

    public creerSession(): void {
        // Creer la nouvelle session sur le server -> bdd
        this.router.navigateByUrl('/listeSession');
    }


}

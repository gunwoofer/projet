import { AuthService } from './../authentification/authService.service';
import { ListeSessionService } from './../listeSession/listeSessionService.service';
import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-liste-session',
    templateUrl: './detailsSession.component.html',
    styleUrls: ['./detailsSession.component.css']
})

export class DetailsSessionComponent implements OnInit {

    public session: Session;

    constructor(private router: Router, private listeSessionService: ListeSessionService, private auth: AuthService) {

    }

    public ngOnInit(): void {
        this.session = this.listeSessionService.sessionSelection;
    }

    public estConnecte(): boolean {
        return this.auth.isAuthenticated();
    }


}


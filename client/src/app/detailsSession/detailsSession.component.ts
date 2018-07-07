import { Etudiant } from './../etudiant/etudiant';
import { AuthService } from './../authentification/authService.service';
import { ListeSessionService } from './../listeSession/listeSessionService.service';
import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DetailsSessionService } from './detailsSessionService.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-liste-session',
    templateUrl: './detailsSession.component.html',
    styleUrls: ['./detailsSession.component.css']
})

export class DetailsSessionComponent implements OnInit {
    public session: Session;
    public sessionLoaded = false;
    private etudiantActuel: Etudiant;

    constructor(private route: ActivatedRoute, private listeSessionService: ListeSessionService, private auth: AuthService, private detailsSessionService: DetailsSessionService) {

    }

    public ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.detailsSessionService.getSessionByID(params['id'])
                .then((session) => {
                    console.log(session);
                    this.session = session;
                    this.sessionLoaded = true;
                })
         });
        if (this.auth.userProfile) {
            this.etudiantActuel = new Etudiant(
                this.auth.userProfile['http://revise-pas-seul/prenom'],
                this.auth.userProfile['http://revise-pas-seul/nom'],
                this.auth.userProfile['http://revise-pas-seul/genie'],
                this.auth.userProfile.name,
                this.auth.userProfile.picture
            );
        } else {
            this.auth.getProfile((err, profile) => {
                this.etudiantActuel = new Etudiant(
                    profile['http://revise-pas-seul/prenom'],
                    profile['http://revise-pas-seul/nom'],
                    profile['http://revise-pas-seul/genie'],
                    profile.name,
                    profile.picture
                );
            });
        }

    }

    public estConnecte(): boolean {
        return this.auth.isAuthenticated();
    }

    public rejoindreSession(): void {
        
        console.log(this.etudiantActuel);

        if (this.session) {
            this.session.ajouterEtudiant(this.etudiantActuel);
            this.detailsSessionService.ajouterEtudiantBDD(this.session);
        }
    }


}


import { Etudiant } from './../etudiant/etudiant';
import { AuthService } from './../authentification/authService.service';
import { ListeSessionService } from './../listeSession/listeSessionService.service';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsSessionService } from './detailsSessionService.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-liste-session',
    templateUrl: './detailsSession.component.html',
    styleUrls: ['./detailsSession.component.css']
})

export class DetailsSessionComponent implements OnInit {
    public session: Session;
    public sessionLoaded = false;
    public estInscrit = true;
    private etudiantActuel: Etudiant;
    

    constructor(private router: Router, private route: ActivatedRoute, private listeSessionService: ListeSessionService, private auth: AuthService, private detailsSessionService: DetailsSessionService) {

    }

    public ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.detailsSessionService.getSessionByID(params['id'])
                .then((session) => {
                    console.log(session);

                    for (let i = 0; i < session.listeParticipants.length; i++) {
                        if (session.listeParticipants[i] instanceof Etudiant == false) {
                            session.listeParticipants[i] = Etudiant.rehydrater(
                                session.listeParticipants[i].prenom,
                                session.listeParticipants[i].nom,
                                session.listeParticipants[i].genie,
                                session.listeParticipants[i].mail,
                                session.listeParticipants[i].avatar 
                            ); 
                        }
                    }

                    this.session = session;
                    this.sessionLoaded = true;

                    if (this.auth.userProfile) {
                        this.etudiantActuel = new Etudiant(
                            this.auth.userProfile['http://revise-pas-seul/prenom'],
                            this.auth.userProfile['http://revise-pas-seul/nom'],
                            this.auth.userProfile['http://revise-pas-seul/genie'],
                            this.auth.userProfile.name,
                            this.auth.userProfile.picture
                        );
                        this.estDejaInscrit();
                    } else {
                        this.auth.getProfile((err, profile) => {
                            this.etudiantActuel = new Etudiant(
                                profile['http://revise-pas-seul/prenom'],
                                profile['http://revise-pas-seul/nom'],
                                profile['http://revise-pas-seul/genie'],
                                profile.name,
                                profile.picture
                            );
                            this.estDejaInscrit();
                        });
                    }

                })
         });
        

    }

    public peutRejoindre(): boolean {
        return this.estConnecte() && !this.estInscrit;
    }

    public estConnecte(): boolean {
        return this.auth.isAuthenticated();
    }

    public rejoindreSession(): void {
        console.log(this.etudiantActuel);
        if (this.session) {
            this.session.ajouterEtudiant(this.etudiantActuel);
            this.detailsSessionService.ajouterEtudiantBDD(this.session);
            this.estDejaInscrit();
        }
    }

    private estDejaInscrit(): boolean {
        for (const etudiant of this.session.listeParticipants) {
            if (this.etudiantActuel && etudiant.getMail() == this.etudiantActuel.getMail()) {
                console.log("Tu es deja inscrit !");
                return true;
            }
        }
        this.estInscrit = false;
        return false;
    }



}


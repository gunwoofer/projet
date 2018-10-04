import { Etudiant } from './../etudiant/etudiant';
import { AuthService } from './../authentification/authService.service';
import { ListeSessionService } from './../listeSession/listeSessionService.service';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsSessionService } from './detailsSessionService.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-liste-session',
    templateUrl: './detailsSession.component.html',
    styleUrls: ['./detailsSession.component.css']
})

export class DetailsSessionComponent implements OnInit {
    public session: Session;
    public sessionLoaded = false;
    private etudiantActuel: Etudiant;
    private canJoin: boolean;
    private canLeave: boolean;


    constructor(private router: Router, private route: ActivatedRoute, private listeSessionService: ListeSessionService,
        private auth: AuthService, private detailsSessionService: DetailsSessionService, private location: Location) {

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

                    this.auth.getEtudiant().then((etudiant) => {
                        this.etudiantActuel = etudiant;
                        this.peutRejoindreOuQuitter();
                    }).catch((err) => {
                        console.log("Erreur lors de la recuperation du profil !")
                    })

                })
        });


    }

    public peutRejoindreOuQuitter(): void {
        this.canJoin = this.auth.isAuthenticated() && !this.estDejaInscrit();
        this.canLeave = this.auth.isAuthenticated() && this.estDejaInscrit();
    }



    public rejoindreSession(): void {
        console.log("Tu as rejoint la session !");
        if (this.session) {
            this.detailsSessionService.ajouterEtudiantBDD(this.etudiantActuel, this.session).then(() => this.ngOnInit());
        }
    }

    public quitterSession(): void {
        console.log("tu as quitté la session ! A bientot");
        this.detailsSessionService.retirerEtudiantBDD(this.etudiantActuel, this.session).then(() => {
            this.router.navigateByUrl('/listeSession');
        });
    }

    private estDejaInscrit(): boolean {
        for (const etudiant of this.session.listeParticipants) {
            if (this.etudiantActuel && etudiant.getMail() == this.etudiantActuel.getMail()) {
                console.log("Tu es deja inscrit !");
                return true;
            }
        }
        return false;
    }

    private retourListeSession(): void {
        this.router.navigateByUrl('/listeSession');
    }



}


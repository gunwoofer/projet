import { getTestBed } from '@angular/core/testing';
import { CreationSessionService } from './creationSessionService.service';
import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../authentification/authService.service';
import { Etudiant } from '../etudiant/etudiant';
import {FormControl} from '@angular/forms';
import { LISTE_COURS } from '../data/listeCours';

@Component({
    selector: 'app-liste-session',
    templateUrl: './creationSession.component.html',
    styleUrls: ['./creationSession.component.css']
})
export class CreationSessionComponent {

    public liste_cours = LISTE_COURS;
    public liste_sigles_filter: string[] = [];
    public sigleCours: string;
    public titreCours: string;
    public salle: string;
    public heureDebut: Date;
    public description: string;
    public date;


    constructor (public router: Router, private creationSessionService: CreationSessionService, private auth: AuthService) {
        let today = new Date().toISOString().substr(0, 10);
        this.date = today;

        for (let cours of this.liste_cours) {
            this.liste_sigles_filter.push(cours["sigle"]);
        }
        
    }


    

    public onSubmit(form: NgForm): void {
        const heureDebutFix = Date.parse(this.date + " " + this.heureDebut.toString());
        const nouvelleSession = new Session(this.sigleCours,
                                            this.titreCours,
                                            this.salle,
                                            heureDebutFix,
                                            undefined,
                                            undefined,
                                            this.description);
        this.auth.getEtudiant().then((etudiant) => {
            this.creationSessionService.ajouterSession(nouvelleSession, etudiant).then((session) => {
                this.router.navigateByUrl('/detailsSession/' + session.guid);
            });
        }).catch((err) => {
            console.log("Erreur lors de la recuperation du profil !")
        })

        
    }

    public retour(): void {
        this.router.navigateByUrl('/listeSession');
    }

    public formulaireValide(): boolean {
        if (this.sigleCours && this.titreCours && this.salle && this.heureDebut) {
            return true;
        }
        return false;
    }

    public sigleChanged(event) {

        // Update the filter with the input
        const inputReg = new RegExp("^" + event.toUpperCase());
        this.liste_sigles_filter = [];
        for (let cours of this.liste_cours) {
            if (inputReg.exec(cours["sigle"])) {
                this.liste_sigles_filter.push(cours["sigle"]);
            }
        }

        // Update the class title if the sigle exists
        for (let cours of this.liste_cours) {
            if (event.toLowerCase() == cours["sigle"].toLowerCase()) {
                this.titreCours = cours["titre"];
            }
        }
    }

}

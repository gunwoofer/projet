import { getTestBed } from '@angular/core/testing';
import { CreationSessionService } from './creationSessionService.service';
import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-liste-session',
    templateUrl: './creationSession.component.html',
    styleUrls: ['./creationSession.component.css']
})
export class CreationSessionComponent {

    public sigleCours: string;
    public titreCours: string;
    public salle: string;
    public heureDebut: Date;
    public description: string;
    public date;

    constructor (public router: Router, private creationSessionService: CreationSessionService) {
        let today = new Date().toISOString().substr(0, 10);;
        this.date = today;

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
        console.log(nouvelleSession);
        this.creationSessionService.ajouterSession(nouvelleSession);

        this.router.navigateByUrl('/listeSession');
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

}

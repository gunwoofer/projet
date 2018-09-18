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
    public heureFin: Date;
    public description: string;

    constructor (public router: Router, private creationSessionService: CreationSessionService) {}

    public onSubmit(form: NgForm): void {
        const heureDebutFix = Date.parse(this.heureDebut.toString());
        const heureFinFix = Date.parse(this.heureFin.toString());
        const nouvelleSession = new Session(this.sigleCours,
                                            this.titreCours,
                                            this.salle,
                                            heureDebutFix,
                                            heureFinFix,
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
            if (this.heureFin) {
                if (this.dateValide()) {
                    return true;
                }
                return false;
            }
            return true;
        }
        return false;
    }

    public dateValide(): boolean {
        if (this.heureFin && this.heureDebut) {
            const heureDebutFix = Date.parse(this.heureDebut.toString());
            const heureFinFix = Date.parse(this.heureFin.toString());
            return heureFinFix - heureDebutFix > 0;
        }
        return true;
    }

}

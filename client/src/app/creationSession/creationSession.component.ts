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

    constructor (public router: Router, private creationSessionService: CreationSessionService) {}

    public onSubmit(form: NgForm): void {
        console.log('test heure debut : ', typeof(this.heureDebut));
        const heureDebutFix = Date.parse(this.heureDebut.toString());
        const heureFinFix = Date.parse(this.heureFin.toString());
        const nouvelleSession = new Session(this.sigleCours,
                                            this.titreCours,
                                            this.salle,
                                            heureDebutFix,
                                            heureFinFix);
        console.log(nouvelleSession);
        this.creationSessionService.ajouterSession(nouvelleSession);

        this.router.navigateByUrl('/listeSession');
    }

    public retour(): void {
        this.router.navigateByUrl('/listeSession');
    }


}

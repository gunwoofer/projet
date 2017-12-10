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
        // Creer la nouvelle session sur le server -> bdd
        const nouvelleSession = new Session(this.sigleCours,
                                            this.titreCours,
                                            this.salle,
                                            this.heureDebut,
                                            this.heureFin);
        console.log(nouvelleSession);

        this.router.navigateByUrl('/listeSession');
    }


}

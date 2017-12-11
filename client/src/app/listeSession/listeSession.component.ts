import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-liste-session',
    templateUrl: './listeSession.component.html',
    styleUrls: ['./listeSession.component.css']
})
export class ListeSessionComponent implements OnInit {

    public listeSessions: Session[] = new Array();

    constructor (private router: Router) {}

    public ngOnInit(): void {
        // Recuperer la liste des sessions sur le server depuis la bdd -> this.listeSessions
        console.log('INIT !');

        // Mock sessions
        const heureDebut = new Date(2017, 5, 11, 17, 30, 0);
        const heureFin = new Date(2017, 5, 11, 18, 30, 0);

        const session1: Session = new Session('PHS1102', 'Physique electromagnetisme', 'C-415', heureDebut, heureFin);
        const session2: Session = new Session('MTH2302D', 'Probabilites et statistiques', 'B-404', heureDebut, heureFin);
        const session3: Session = new Session('SSH3100B', 'Sciences sociales de la technologie', 'Bibliotheque', heureDebut, heureFin);
        const session4: Session = new Session('INF2705', 'Infographie', 'L4620', heureDebut, heureFin);
        const session5: Session = new Session('Projet II', 'Projet de conception logicielle', 'M3200', heureDebut, heureFin);
        
        this.listeSessions.push(session1);
        this.listeSessions.push(session2);
        this.listeSessions.push(session3);
        this.listeSessions.push(session4);
        this.listeSessions.push(session5);
  }

    public creerSessionClick(): void {
        console.log('creer session');
        this.router.navigateByUrl('/creationSession');
    }
}

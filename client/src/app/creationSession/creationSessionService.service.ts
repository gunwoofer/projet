import { Http, Response } from '@angular/http';
import { Session } from './../session/session';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Etudiant } from '../etudiant/etudiant';

const AJOUTER_SESSION_URL = 'http://localhost:3000/ajouterSession';

@Injectable()
export class CreationSessionService {

    constructor(private http: Http) {}

    public ajouterSession(session: Session, etudiant: Etudiant): Promise<Session> {
        const params = { session: session, etudiant: etudiant };
        return this.http.post(AJOUTER_SESSION_URL, params)
        .toPromise()
        .then((reponse) => {
            const session = reponse.json().obj;
            const nouvelleSession = new Session(
                session.sigleCours,
                session.titreCours,
                session.salle,
                session.heureDebut,
                session.guid,
                session.listeParticipants,
                session.description
            );
            return nouvelleSession;
        });
    }
}

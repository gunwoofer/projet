import { Http, Response } from '@angular/http';
import { Session } from './../session/session';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Etudiant } from '../etudiant/etudiant';
const AJOUTER_SESSION_URL = 'http://localhost:3000/ajouterSession';
const OBTENIR_LISTE_COURS_URL = 'http://localhost:3000/obtenirCours'


@Injectable()
export class CreationSessionService {

    constructor(private http: Http) {}

    public ajouterSession(session: Session, etudiant: Etudiant): Promise<Session> {
        const params = { session: session, etudiant: etudiant };
        return this.http.post(AJOUTER_SESSION_URL, params)
        .toPromise()
        .then((reponse) => {
            const session = reponse.json().obj;
            const nouvelleSession = Session.rehydraterSession(session);
            return nouvelleSession;
        });
    }

    public obtenirListeCours(): Promise<Response> {
        return this.http.get(OBTENIR_LISTE_COURS_URL)
        .toPromise()
        .then((reponse) => {
            return reponse.json().obj;
        });
    }
    
}

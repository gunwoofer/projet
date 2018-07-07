import { Http, Response } from '@angular/http';
import { Session } from './../session/session';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Etudiant } from '../etudiant/etudiant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const AJOUTER_ETUDIANT_URL = 'http://localhost:3000/ajouterEtudiant';
const OBTENIR_SESSION_ID_URL = 'http://localhost:3000/obtenirSessionID';

@Injectable()
export class DetailsSessionService {

    constructor(private http: Http) {}


    public ajouterEtudiantBDD(session: Session): Promise<Response> {

        console.log(session);

        return this.http.post(AJOUTER_ETUDIANT_URL, session)
            .toPromise()
            .then((reponse: Response) =>  {
                reponse.json();
            })
            .catch((erreur) => erreur.json());
    }

    public getSessionByID(guid: string): Promise<Session> {
        return this.http.post(OBTENIR_SESSION_ID_URL, {guid: guid})
            .toPromise()
            .then((reponse) => {
                const session = reponse.json().obj;
                const nouvelleSession = new Session(
                    session.sigleCours,
                    session.titreCours,
                    session.salle,
                    session.heureDebut,
                    session.heureFin,
                    session.guid,
                    session.listeParticipants
                );
                return nouvelleSession;
            })
    }
}

import { Http, Response } from '@angular/http';
import { Session } from './../session/session';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Etudiant } from '../etudiant/etudiant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { resolve } from 'q';

const AJOUTER_ETUDIANT_URL = 'http://localhost:3000/ajouterEtudiant';
const OBTENIR_SESSION_ID_URL = 'http://localhost:3000/obtenirSessionID';
const SUPPRIMER_ETUDIANT_URL = 'http://localhost:3000/supprimerEtudiant';

@Injectable()
export class DetailsSessionService {

    constructor(private http: Http) {}


    public ajouterEtudiantBDD(etudiant: Etudiant, session: Session): Promise<Response> {
        const params = { etudiant: etudiant, session: session};        
        return this.http.post(AJOUTER_ETUDIANT_URL, params)
            .toPromise()
            .then((reponse: Response) =>  {
                resolve(reponse);
            })
            .catch((erreur) => erreur.json());
    }

    public retirerEtudiantBDD(etudiant: Etudiant, session: Session): Promise<Response> {
        const params = { etudiant: etudiant, session: session};
        return this.http.post(SUPPRIMER_ETUDIANT_URL, params)
            .toPromise()
            .then((reponse: Response) => {
                resolve(reponse);
            })
            .catch((erreur) => erreur.json());
    }

    public getSessionByID(guid: string): Promise<Session> {
        return this.http.post(OBTENIR_SESSION_ID_URL, {guid: guid})
            .toPromise()
            .then((reponse) => {
                const session = reponse.json().obj;
                const nouvelleSession = Session.rehydraterSession(session);
                return nouvelleSession;
            })
    }
}

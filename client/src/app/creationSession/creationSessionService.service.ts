import { Http, Response } from '@angular/http';
import { Session } from './../session/session';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

const AJOUTER_SESSION_URL = 'http://localhost:3000/ajouterSession';

@Injectable()
export class CreationSessionService {

    constructor(private http: Http) {}

    public ajouterSession(session: Session): Promise<Response> {
        return this.http.post(AJOUTER_SESSION_URL, session)
            .toPromise()
            .then((reponse: Response) =>  reponse.json())
            .catch((erreur) => erreur.json());
    }
}

import { Http, Response } from '@angular/http';
import { Session } from './../session/session';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

const OBTENIR_LISTE_SESSIONS_URL = 'http://localhost:3000/obtenirSessions';

@Injectable()
export class ListeSessionService {

    public sessionSelection: Session;

    constructor(private http: Http) {}

    public obtenirListeSessions(): Promise<Session[]> {
        return this.http.get(OBTENIR_LISTE_SESSIONS_URL)
        .toPromise()
        .then(response => {
            const sessions = response.json().obj;
            const sessionsTemporaire: Session[] = [];
            for (const session of sessions) {
                const nouvelleSession = Session.rehydraterSession(session);
                sessionsTemporaire.push(nouvelleSession);
            }
            return sessionsTemporaire;
        });
    }
}

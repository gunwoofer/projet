import { modelDeSession, SessionModele } from './../session/sessionModele';
import * as express from 'express';

module Route {

    export class Index {

        public ajouterSession(req: express.Request, res: express.Response, next: express.NextFunction): void {
            console.log('Ajout d une session a la bdd !');
            const session = new modelDeSession(req.body);
            console.log('requete body : ' , req.body);
            session.save((err: any, resultat: SessionModele) => {
                console.log('TEST ERREUR DATE :' , resultat);
                if (err) {
                    return res.status(500).json({
                        title: 'une erreur est survenue lors de la sauvegarde',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'La session est sauvegardée',
                    obj: resultat
                });
            });
        }

        public obtenirSessions(req: express.Request, res: express.Response, next: express.NextFunction): void {
            modelDeSession.find((err: any, sessions: SessionModele[]) => {
                if (err) {
                    return res.status(500).json({
                        title: 'Une erreur est survenue',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Nous avons pu recuperer la liste de sessions',
                    obj: sessions
                });
            });
        }
    }
}

export = Route;

import { modelDeSession, SessionModele } from './../session/sessionModele';
import * as express from 'express';
import {Message} from '../../../commun/communication/message';

module Route {

    export class Index {

        public ajouterSession(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('Ajout d une session a la bdd !');
            const piste = new modelDeSession(req.body);
            console.log('requete body : ' , req.body);
            console.log('objet pour bdd : ' , piste);
            piste.save((err: any, resultat: SessionModele) => {
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
    }
}

export = Route;

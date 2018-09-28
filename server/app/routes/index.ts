import * as express from 'express';
import { modelDeSession, SessionModele } from '../session/sessionModele';

module Route {

    export class Index {

        public ajouterSession(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('Ajout d une session a la bdd !');
            const session = new modelDeSession(req.body);
            console.log('requete body : ' , req.body);
            console.log('objet pour bdd : ' , session);
            session.save((err: any, resultat: SessionModele) => {
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

        public ajouterEtudiant(req: express.Request, res: express.Response, next: express.NextFunction): void {
            console.log("AJOUT ETUDIANT A UNE SESSION");
            console.log(req.body.guid);
            let newSession = {
                guid: req.body.guid,
                listeParticipants: req.body.listeParticipants,
                sigleCours: req.body.sigleCours,
                titreCours: req.body.titreCours,
                salle: req.body.salle,
                heureDebut: req.body.heureDebut,
            }
            modelDeSession.findOneAndUpdate({ guid: req.body.guid }, newSession, (err: any, session: any) => {
                console.log(session);
                if (err) {
                    return res.status(500).json({
                        title: 'Une erreur est survenue',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Nous avons pu ajouter l etudiant',
                });
            });
        }

        public supprimerEtudiant(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log("Supprimer un etudiant !")
            let indexASupprimer = -1;
            for (let i = 0; i < req.body.session.listeParticipants.length; i++) {
                if (req.body.session.listeParticipants[i].mail == req.body.etudiant.mail) {
                    indexASupprimer = i;
                }
            }
            if (indexASupprimer != -1) {
                console.log("l index a supprimer est le : " + indexASupprimer);
                const newSession = req.body.session;
                newSession.listeParticipants.splice(indexASupprimer, 1);
                modelDeSession.findOneAndUpdate({ guid: req.body.session.guid }, newSession, (err: any, session: any) => {
                    console.log(session);
                    if (err) {
                        console.log("une erreur est survenue");
                        return res.status(500).json({
                            title: 'Une erreur est survenue',
                            error: err
                        });
                    }
                    res.status(200).json({
                        message: 'Nous avons supprime l etudiant',
                    });
                });
            }
        }

        public obtenirSessionID(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log("obtenir session par ID !");
            modelDeSession.findOne({guid: req.body.guid}, (err: any, session: any) => {
                console.log(req.body.guid);
                if (err) {
                    return res.status(500).json({
                        title: 'Une erreur est survenue',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Nous avons pu recuperer la session',
                    obj: session
                });
            })
        }

        public testhttp(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.send(JSON.stringify("SALUT HTTP"));
        }
    }

    
}

export = Route;

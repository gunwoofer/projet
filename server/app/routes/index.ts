import * as express from 'express';
import * as fs from 'fs';
import { modelDeSession, SessionModele } from '../session/sessionModele';
import { modelDeCours, CoursModele } from '../cours/coursModele';

module Route {

    export class Index {

        public ajouterSession(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('Ajout d une session a la bdd !');
            req.body.session.listeParticipants.push(req.body.etudiant);
            const session = new modelDeSession(req.body.session);
            session.save((err: any, resultat: SessionModele) => {
                if (err) {
                    res.status(500).json({
                        title: 'une erreur est survenue lors de la sauvegarde',
                        error: err
                    });
                }
                res.status(200).json({
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
            let newSession = req.body.session;
            newSession.listeParticipants.push(req.body.etudiant);
            modelDeSession.findOneAndUpdate({ guid: req.body.session.guid }, newSession, (err: any, session: any) => {
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
                let sessionVide = newSession.listeParticipants.length == 0;

                if(sessionVide) {
                    modelDeSession.deleteOne({ guid: req.body.session.guid }, (err) => {
                        if (err) {
                            return res.status(500).json({
                                title: 'Une erreur est survenue',
                                error: err
                            });
                        }
                        return res.status(200).json({
                            message: 'Nous avons supprime la session vide',
                            vide: sessionVide
                        });
                    })
                }
                else {
                    modelDeSession.findOneAndUpdate({ guid: req.body.session.guid }, newSession, (err: any, session: any) => {
                        console.log(session);
                        if (err) {
                            console.log("une erreur est survenue");
                            return res.status(500).json({
                                title: 'Une erreur est survenue',
                                error: err
                            });
                        }
                        return res.status(200).json({
                            message: 'Nous avons supprime l etudiant',
                            vide: sessionVide
                        });
                    });
                }
                
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

        public obtenirCours(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log("Obtenir la liste de tous les cours avec sigle");
            modelDeCours.find({}, null, (err: any, cours: any) => {
                if (err){
                    return res.status(500).json({
                        title: 'Une erreur est survenue',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Nous avons pu recuperer les cours',
                    obj: cours
                });
                
            })
        }

        public testhttp(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.send(JSON.stringify("SALUT HTTP"));
        }
    }

    
}

export = Route;

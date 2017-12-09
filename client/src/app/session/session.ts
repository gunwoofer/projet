import { Etudiant } from './../etudiant/etudiant';

export class Session {
    private sigleCours: string;
    private titreCours: string;
    private salle: string;
    private heureDebut: Date;
    private heureFin: Date;
    private listeParticipants: Etudiant[];

    constructor() {
        
    }
}

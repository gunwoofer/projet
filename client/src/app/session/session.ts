import { Guid } from './../guid';
import { Etudiant } from './../etudiant/etudiant';

export class Session {
    public sigleCours: string;
    public titreCours: string;
    public salle: string;
    public heureDebut: Date;
    public heureFin: Date;
    public listeParticipants: Etudiant[];
    public guid = Guid.newGuid();

    constructor(sigle: string, titre: string, salle: string, heureDebut: Date, heureFin: Date) {
        this.sigleCours = sigle;
        this.titreCours = titre;
        this.salle = salle;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.listeParticipants = new Array();
    }

    public ajouterEtudiant(etudiant: Etudiant): void {
        this.listeParticipants.push(etudiant);
    }
}

import { Guid } from './../guid';
import { Etudiant } from './../etudiant/etudiant';

export class Session {
    public sigleCours: string;
    public titreCours: string;
    public salle: string;
    public heureDebut: number;  // millisecond
    public listeParticipants: Etudiant[];
    public guid: string;
    public description: string;

    constructor(sigle: string, titre: string, salle: string, heureDebut: number, guid: string = Guid.newGuid(), listeParticipants: Etudiant[] = new Array(), description: string = "") {
        this.sigleCours = sigle;
        this.titreCours = titre;
        this.salle = salle;
        this.heureDebut = heureDebut;
        this.listeParticipants = listeParticipants;
        this.guid = guid;
        this.description = description;
    }

    public ajouterEtudiant(etudiant: Etudiant): void {
        this.listeParticipants.push(etudiant);
    }
}

import { Guid } from './../guid';
import { Etudiant } from './../etudiant/etudiant';

export class Session {
    private sigleCours: string;
    private titreCours: string;
    private salle: string;
    public heureDebut: Date;
    public heureFin: Date;
    private listeParticipants: Etudiant[];
    public guid = Guid.newGuid();

    constructor(sigle: string, titre: string, salle: string) {
        this.sigleCours = sigle;
        this.titreCours = titre;
        this.salle = salle;
        this.listeParticipants = new Array();
    }

    public ajouterEtudiant(etudiant: Etudiant): void {
        this.listeParticipants.push(etudiant);
    }

    public definirTrancheHoraire(debut: Date, fin: Date): void {
        this.heureDebut = debut;
        this.heureFin = fin;
    }
}

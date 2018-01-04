export interface SessionInterface {
    guid: string;
    sigleCours: string;
    titreCours: string;
    salle: string;
    heureDebut: Date;
    heureFin: Date;
    listeParticipants: any[];
}

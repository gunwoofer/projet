export interface SessionInterface {
    guid: string;
    sigleCours: string;
    titreCours: string;
    salle: string;
    heureDebut: Date;
    listeParticipants: any[];
}
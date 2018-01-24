
export enum Genie {
    Informatique = 'Informatique',
    Logiciel = 'Logiciel',
    Civil = 'Civil',
    Chimique = 'Chimique',
    Industriel = 'Industriel',
    Physique = 'Physique',
    Mecanique = 'Mecanique',
    AeroSpatial = 'Aéro-Spatial',
    BioMedical = 'Bio-médical',
    Electrique = 'Electrique',
    Geologique = 'Géologique',
    Mines = 'Mines'
}

export class Etudiant {
    private prenom: string;
    private nom: string;
    private matricule: string;
    private genie: Genie;
    private mail: string;
    private avatar: string; // Lien gravatar


    constructor(prenom: string, nom: string, genie: Genie, mail: string, avatar: string) {
        this.prenom = prenom;
        this.nom = nom;
        this.genie = genie;
        this.mail = mail;
        this.avatar = avatar;
    }

    public setMatricule(matricule: string): void {
        this.matricule = matricule;
    }
}

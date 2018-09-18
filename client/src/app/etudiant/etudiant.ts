
// export enum Genie {
//     Informatique = 'Informatique',
//     Logiciel = 'Logiciel',
//     Civil = 'Civil',
//     Chimique = 'Chimique',
//     Industriel = 'Industriel',
//     Physique = 'Physique',
//     Mecanique = 'Mecanique',
//     AeroSpatial = 'Aéro-Spatial',
//     BioMedical = 'Bio-médical',
//     Electrique = 'Electrique',
//     Geologique = 'Géologique',
//     Mines = 'Mines'
// }

export class Etudiant {
    public prenom: string;
    public nom: string;
    public matricule: string;
    public genie: string;
    public mail: string;
    public avatar: string; // Lien gravatar


    constructor(prenom: string, nom: string, genie: string, mail: string, avatar: string) {
        this.prenom = prenom;
        this.nom = nom;
        this.genie = genie;
        this.mail = mail;
        this.avatar = avatar;
    }

    public static rehydrater(prenom: string, nom: string, genie: string, mail: string, avatar: string): Etudiant {
        return new Etudiant(prenom, nom, genie, mail, avatar);
    }

    public setMatricule(matricule: string): void {
        this.matricule = matricule;
    }

    public getGenie(): string {
        return this.genie;
    }

    public getMail(): string {
        return this.mail;
    }
}

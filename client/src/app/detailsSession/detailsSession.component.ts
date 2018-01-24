import { Etudiant, Genie } from './../etudiant/etudiant';
import { AuthService } from './../authentification/authService.service';
import { ListeSessionService } from './../listeSession/listeSessionService.service';
import { RouterModule } from '@angular/router';
import { Session } from './../session/session';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-liste-session',
    templateUrl: './detailsSession.component.html',
    styleUrls: ['./detailsSession.component.css']
})

export class DetailsSessionComponent implements OnInit {

    public session: Session;
    public profil: any;

    public prenom: string;
    public nom: string;
    public genie: string;
    public mail: string;
    public avatar: string;

    constructor(private router: Router, private listeSessionService: ListeSessionService, private auth: AuthService) {

    }

    public ngOnInit(): void {
        this.session = this.listeSessionService.sessionSelection;
        if (this.auth.userProfile) {
            this.profil = this.auth.userProfile;
            console.log(this.profil);
          } else {
            const self = this;
            this.auth.getProfile((err, profile) => {
              self.profil = profile;
              console.log(self.profil);

              this.prenom = self.profil['http://revise-pas-seul/prenom'];
              this.nom = self.profil['http://revise-pas-seul/nom'];
              this.genie = self.profil['http://revise-pas-seul/genie'];
              this.mail = self.profil.name;
              this.avatar = self.profil.picture;
            });
          }

    }

    public estConnecte(): boolean {
        return this.auth.isAuthenticated();
    }

    public rejoindreSession(): void {
        let genie: Genie;

        switch (this.genie) {
            case('informatique'): { genie = Genie.Informatique ; break; }
            case('logiciel'): { genie = Genie.Logiciel ; break; }
            case('civil'): { genie = Genie.Civil ; break; }
            case('chimique'): { genie = Genie.Chimique ; break; }
            case('industriel'): { genie = Genie.Industriel ; break; }
            case('physique'): { genie = Genie.Physique ; break; }
            case('mecanique'): { genie = Genie.Mecanique ; break; }
            case('aero'): { genie = Genie.AeroSpatial ; break; }
            case('bio'): { genie = Genie.BioMedical ; break; }
            case('electrique'): { genie = Genie.Electrique ; break; }
            case('geo'): { genie = Genie.Geologique ; break; }
            case('mine'): { genie = Genie.Mines ; break; }
            default : { genie = null ; }
        }

        const etudiant = new Etudiant(this.prenom, this.nom, genie, this.mail, this.avatar);
        console.log(etudiant);
    }


}


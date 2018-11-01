import { AuthService } from './authService.service';
// components/toolbar.component.ts
import { Component } from '@angular/core';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [AuthService]
})
export class AuthentificationComponent {

  private fullName: string;

  constructor(private auth: AuthService) {
    this.getFullName();
  }
  public login() {
    this.auth.login();
  }

  public logout() {
    this.auth.logout();
  }

  private getFullName() {
    this.auth.getEtudiant().then((etudiant) => {
        const fullName = etudiant.prenom + " " + etudiant.nom;
        this.fullName = fullName;
        console.log(fullName);
    })
  }

  public isAuthenticated(): boolean {
      return this.auth.isAuthenticated();
  }
}

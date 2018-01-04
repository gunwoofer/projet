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
  constructor(private auth: AuthService) {}
  public login() {
    this.auth.login();
  }

  public logout() {
    this.auth.logout();
  }

  public isAuthenticated(): boolean {
      return this.auth.isAuthenticated();
  }
}

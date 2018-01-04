import { AuthService } from './authentification/authService.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public auth: AuthService) {
        this.auth.handleAuthentication();
      }
}


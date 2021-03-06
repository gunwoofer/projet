import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Etudiant } from '../etudiant/etudiant';

@Injectable()
export class AuthService {

    public userProfile: any;

    public auth0 = new auth0.WebAuth({
        clientID: 'LSKVdu6NVLbvMVVtKITPBZ7M7Adxhmna',
        domain: 'revise-pas-seul-poly.auth0.com',
        responseType: 'token id_token',
        audience: 'https://revise-pas-seul-poly.auth0.com/userinfo',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile user_metadata'
    });

    constructor(public router: Router) {}

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        console.log('test authentification console');
        this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            this.setSession(authResult);
            this.router.navigateByUrl('/listeSession');
        } else if (err) {

            this.router.navigateByUrl('/erreur');
            console.log(err);
        }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.log('Vous n etes pas connecté !')
            //throw new Error('Access token must exist to fetch profile');
        }
        else {
            const self = this;
            this.auth0.client.userInfo(accessToken, (err, profile) => {
              if (profile) {
                self.userProfile = profile;
              }
              cb(err, profile);
            });
        }

    }

    public getEtudiant(): Promise<Etudiant> {
        return new Promise((resolve, reject) => {
            if (this.userProfile) {
                const etudiant = new Etudiant(
                    this.userProfile['http://revise-pas-seul/prenom'],
                    this.userProfile['http://revise-pas-seul/nom'],
                    this.userProfile['http://revise-pas-seul/genie'],
                    this.userProfile.name,
                    this.userProfile.picture
                );
                resolve(etudiant);
            } else {
                this.getProfile((err, profile) => {
                    if (err) { reject(err); }
                    const etudiant = new Etudiant(
                        profile['http://revise-pas-seul/prenom'],
                        profile['http://revise-pas-seul/nom'],
                        profile['http://revise-pas-seul/genie'],
                        profile.name,
                        profile.picture
                    );
                    resolve(etudiant);
                });
            }
        }
            
        )
        
        
    }


}

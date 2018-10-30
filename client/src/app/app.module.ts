import { DetailsSessionComponent } from './detailsSession/detailsSession.component';
import { AuthService } from './authentification/authService.service';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RechercheSessionParTitrePipe } from './recherchePipe/recherchePipe';
import { ListeSessionService } from './listeSession/listeSessionService.service';
import { CreationSessionService } from './creationSession/creationSessionService.service';
import { CreationSessionComponent } from './creationSession/creationSession.component';
import { AppRoutingModule } from './app-routing.module';
import { ListeSessionComponent } from './listeSession/listeSession.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailsSessionService } from './detailsSession/detailsSessionService.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    RechercheSessionParTitrePipe,
    ListeSessionComponent,
    CreationSessionComponent,
    AuthentificationComponent,
    DetailsSessionComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  providers: [
    CreationSessionService,
    ListeSessionService,
    AuthService,
    DetailsSessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

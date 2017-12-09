import { CreationSessionComponent } from './creationSession/creationSession.component';
import { AppRoutingModule } from './app-routing.module';
import { ListeSessionComponent } from './listeSession/listeSession.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BasicService} from './basic.service';

@NgModule({
  declarations: [
    AppComponent,
    ListeSessionComponent,
    CreationSessionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    BasicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

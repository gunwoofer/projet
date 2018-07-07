import { DetailsSessionComponent } from './detailsSession/detailsSession.component';
import { CreationSessionComponent } from './creationSession/creationSession.component';
import { ListeSessionComponent } from './listeSession/listeSession.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: '', redirectTo: '/listeSession', pathMatch: 'full'},
    { path: 'listeSession', component: ListeSessionComponent },
    { path: 'creationSession', component: CreationSessionComponent},
    { path: 'callback', component: ListeSessionComponent },
    { path : 'detailsSession/:id', component: DetailsSessionComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

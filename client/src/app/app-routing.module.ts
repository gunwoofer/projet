import { ListeSessionComponent } from './listeSession/listeSession.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: '', redirectTo: '/listeSession', pathMatch: 'full'},
    { path: 'listeSession', component: ListeSessionComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

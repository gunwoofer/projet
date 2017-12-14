import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'filtrepartitre'
})

@Injectable()
export class RechercheSessionParTitrePipe implements PipeTransform {
    public transform(sessions: any, recherche: string) {
        if (recherche) {
            recherche = recherche.toLowerCase();
            return sessions.filter((el: any) => {
                return el.titreCours.toLowerCase().indexOf(recherche) > -1 ||
                    el.sigleCours.toLowerCase().indexOf(recherche) > -1 ;
         });
        }
        return sessions;
       }
}

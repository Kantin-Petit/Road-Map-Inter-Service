import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  truncateText(texte: string): string {

    const indexMotif = texte.indexOf('** **');
    const limit = 50;

    if (indexMotif !== -1 && indexMotif <= limit) {
      return texte.substring(0, indexMotif);
    } else {
      const extrait = texte.substring(0, limit);
      const dernierEspace = extrait.lastIndexOf(' ');
      let resultat = extrait.substring(0, dernierEspace);
      if (texte.length > limit) {
        resultat += '...';
      }
      return resultat;
    }
  }

}

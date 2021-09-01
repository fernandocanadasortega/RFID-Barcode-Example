import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; // For rxjs 6

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private selectedLanguage = new Subject<string>();

    public languages = [
        {
            code: 'en',
            name: 'english'
        },
        {
            code: 'es',
            name: 'spanish'
        }
    ];

    constructor() { }

    /**
     * Devuelve el observable con la lista de idiomas que se activa cuando se cambia de idioma
     * @returns Observable<string>, observable que se activa cuando se cambia de idioma
     */
    public getLanguageObservable(): Observable<string> {
        return this.selectedLanguage.asObservable();
    }

    /**
     * Establece un nuevo idioma
     * @param data any, idioma seleccionado
     */
    public setLanguageData(data: any) {
        this.selectedLanguage.next(data);
    }

    /**
     * Cambia el idioma actual
     */
    languageChange() {
      let language: string = localStorage.getItem('language');

      localStorage.setItem('language', language);
      this.setLanguageData(language);
  }
}

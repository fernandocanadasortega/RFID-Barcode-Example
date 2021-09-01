import { Component } from '@angular/core';
import { LanguageService } from 'services/languages.service';
import { UtilService } from 'services/util.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  public languages: Array<any> = [];
  public languageParams: any;

  constructor(
    private utils: UtilService,
    private languageService: LanguageService,
  ) { }

  /**
   * Obtiene el idioma usado actualmente y lo carga en memoria
   */
  ngOnInit() {
    this.languageParams = {
      attributeName: "code",
      initialValue: localStorage.getItem('language')
    }

    this.languages = this.languageService.languages;
  }

  /**
   * Cambia el idioma utilizado actualmente
   * @param language any, idioma seleccionado
   */
  saveLanguage(language: any) {
    localStorage.setItem('language', language['code']);
    this.languageService.languageChange();
  }
}

import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/languages.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.initializeApp();
    this.languageService.getLanguageObservable().subscribe(value => {
      this.translateService.use(value);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      if (localStorage.getItem('language') != null && localStorage.getItem('language') != "null" &&
      localStorage.getItem('language') != undefined) {
      this.translateService.setDefaultLang(localStorage.getItem('language'));
    }
    else {
      localStorage.setItem('language', 'es');
      this.translateService.setDefaultLang('es');
    }
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { HeaderComponent } from './header/header.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { MaterialComponentsIconsModule } from 'src/material-components-icons.module';

@NgModule({
  declarations: [
    LanguageSelectComponent,
    HeaderComponent,
    FilterSelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsIconsModule
  ],
  exports: [
    LanguageSelectComponent,
    HeaderComponent,
    FilterSelectComponent
  ]
})
export class ComponentsModule { }

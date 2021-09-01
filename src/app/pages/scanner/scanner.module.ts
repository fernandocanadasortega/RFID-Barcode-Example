import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './scanner-routing.module';

import { LoginPage } from './scanner.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialComponentsIconsModule } from 'src/material-components-icons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    MaterialComponentsIconsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

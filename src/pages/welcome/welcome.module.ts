import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { MaterialModule } from '../../app/material.module';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    MaterialModule
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule {}

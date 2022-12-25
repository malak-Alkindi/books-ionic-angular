import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmorderPageRoutingModule } from './confirmorder-routing.module';

import { ConfirmorderPage } from './confirmorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmorderPageRoutingModule
  ],
  declarations: [ConfirmorderPage]
})
export class ConfirmorderPageModule {}

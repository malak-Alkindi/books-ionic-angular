import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TappagePageRoutingModule } from './tappage-routing.module';

import { TappagePage } from './tappage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TappagePageRoutingModule
  ],
  declarations: [TappagePage]
})
export class TappagePageModule {}

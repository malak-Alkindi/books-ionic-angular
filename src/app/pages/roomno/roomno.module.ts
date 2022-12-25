import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomnoPageRoutingModule } from './roomno-routing.module';

import { RoomnoPage } from './roomno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomnoPageRoutingModule
  ],
  declarations: [RoomnoPage]
})
export class RoomnoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailablePageRoutingModule } from './available-routing.module';
import { CalendarComponentOptions } from 'ion2-calendar'
import { AvailablePage } from './available.page';
import { CalendarModule } from "ion2-calendar";
import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    AvailablePageRoutingModule,
    NgCalendarModule 
  ],
  declarations: [AvailablePage]
})
export class AvailablePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from "ion2-calendar";
import { IonicModule } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar'
import { CheckroomPageRoutingModule } from './checkroom-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CheckroomPage } from './checkroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckroomPageRoutingModule,
    CalendarModule,
    NgCalendarModule 
  ],
  declarations: [CheckroomPage]
})
export class CheckroomPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CalendarModule } from "ion2-calendar";
import { EndedPageRoutingModule } from './ended-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { EndedPage } from './ended.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndedPageRoutingModule,
    CalendarModule,
    NgCalendarModule 
  ],
  declarations: [EndedPage]
})
export class EndedPageModule {}

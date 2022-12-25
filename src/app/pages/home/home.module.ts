import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CalendarModule } from "ion2-calendar";
import { NgCalendarModule  } from 'ionic2-calendar';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CalendarModule,
    NgCalendarModule 
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

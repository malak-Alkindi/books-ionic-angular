import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomnoPage } from './roomno.page';

const routes: Routes = [
  {
    path: '',
    component: RoomnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomnoPageRoutingModule {}

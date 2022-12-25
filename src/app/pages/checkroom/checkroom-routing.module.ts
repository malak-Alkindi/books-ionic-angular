import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckroomPage } from './checkroom.page';

const routes: Routes = [
  {
    path: '',
    component: CheckroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckroomPageRoutingModule {}

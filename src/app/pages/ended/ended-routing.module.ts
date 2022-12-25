import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndedPage } from './ended.page';

const routes: Routes = [
  {
    path: '',
    component: EndedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndedPageRoutingModule {}

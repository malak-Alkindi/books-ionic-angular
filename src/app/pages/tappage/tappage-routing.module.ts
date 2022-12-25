import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TappagePage } from './tappage.page';

const routes: Routes = [
  {
    path: '',
    component: TappagePage,
    children :[
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'available',
        loadChildren: () => import('../../pages/available/available.module').then( m => m.AvailablePageModule)
      },
      {
        path: 'addroom',
        loadChildren: () => import('../../pages/addroom/addroom.module').then( m => m.AddroomPageModule)
      },
      {
        path: 'record',
        loadChildren: () => import('../../pages/record/record.module').then( m => m.RecordPageModule)
      },
      
      {
        path: 'roomno',
        loadChildren: () => import('../../pages/roomno/roomno.module').then( m => m.RoomnoPageModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TappagePageRoutingModule {}

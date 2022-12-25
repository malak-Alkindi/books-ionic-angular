import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'tappage',
    pathMatch: 'full'
  },
 
 
  
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'checkroom',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/checkroom/checkroom.module').then( m => m.CheckroomPageModule)
  },
  {
    path: 'tappage',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/tappage/tappage.module').then( m => m.TappagePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  
  {
    path: 'addroom',
    loadChildren: () => import('./pages/addroom/addroom.module').then( m => m.AddroomPageModule)
  },
  {
    path: 'aprov',
    loadChildren: () => import('./pages/roomno/roomno.module').then( m => m.RoomnoPageModule)
  },
  {
    path: 'confirmorder',
    loadChildren: () => import('./pages/confirmorder/confirmorder.module').then( m => m.ConfirmorderPageModule)
  },
  {
    path: 'available',
    loadChildren: () => import('./pages/available/available.module').then( m => m.AvailablePageModule)
  },
  {
    path: 'ended',
    loadChildren: () => import('./pages/ended/ended.module').then( m => m.EndedPageModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./pages/record/record.module').then( m => m.RecordPageModule)
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then( m => m.RecordsPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

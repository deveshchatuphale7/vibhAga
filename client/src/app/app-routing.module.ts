import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [{path:'home',component:LandingComponent},
{path:'',redirectTo:'home',pathMatch:"full"},
{ path: 'site', loadChildren: () => import('./site/site.module').then(m => m.SiteModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

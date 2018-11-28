import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { PlacesComponent } from './places/places.component';
import { PlaceComponent } from './place/place.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoggedInGuard],
    children: [
    ]
  },
  {
    path: 'places',
    canActivate: [LoggedInGuard],
    children: [
      {
        path: ':uuid',
        component: PlaceComponent
      },
      {
        path: '',
        component: PlacesComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

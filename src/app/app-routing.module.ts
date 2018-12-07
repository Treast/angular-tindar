import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { PlacesComponent } from './places/places.component';
import { PlaceComponent } from './place/place.component';
import { EventComponent } from './event/event.component';
import { AddEventComponent } from './add-event/add-event.component';

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
        children: [
          {
            path: 'events',
            children: [
              {
                path: 'new',
                component: AddEventComponent
              },
              {
                path: ':eventUuid',
                component: EventComponent
              }
            ]
          },
          {
            path: '',
            component: PlaceComponent,
            pathMatch: 'full'
          }
        ]
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

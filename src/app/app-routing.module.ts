import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [LoggedInGuard]
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

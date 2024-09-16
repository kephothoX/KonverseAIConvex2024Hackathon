import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthnComponent  } from './authn.component';

import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: '', component: AuthnComponent },
  { path: 'update/:id', title: 'Update Profile', component: UpdateProfileComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthnRoutingModule { }

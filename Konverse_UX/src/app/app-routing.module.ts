import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './authn/auth.guard'


const routes: Routes = [
  { path: '', redirectTo: '/authn', pathMatch: 'full' },

  { path: 'authn', loadChildren: () => import('./authn/authn.module').then(m => m.AuthnModule) },

   { path: '404', title: 'Error', redirectTo: '/error' },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'files', loadChildren: () => import('./files/files.module').then(m => m.FilesModule) },
  { path: 'ai', loadChildren: () => import('./ai/ai.module').then(m => m.AiModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },

  { path: '**', title: 'Error', redirectTo: '/error' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

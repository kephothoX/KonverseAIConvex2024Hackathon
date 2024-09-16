import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files.component';
import { UploadComponent } from './upload/upload.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', title: 'Files', component: FilesComponent },
  { path: 'upload', title: 'Upload File', component: UploadComponent },
  { path: 'edit/:id', title: 'Edit Upload', component: EditComponent },
  { path: 'view/:id', title: 'View File', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }

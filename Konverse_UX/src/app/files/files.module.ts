import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files.component';
import { UploadComponent } from './upload/upload.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component'


@NgModule({
  declarations: [
    FilesComponent,
    UploadComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBar,
    MatSelectModule,
    MatListModule,
    MatDialogModule
  ]
})
export class FilesModule { }

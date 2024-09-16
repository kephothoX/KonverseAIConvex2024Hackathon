import { Component } from '@angular/core';

import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { FilesService } from '../files.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  formData = new FormData();
  FileStorageID?: string;
  FileURL?: string;
  Response: any;
  DisableFileUploadForm: boolean = true;
  Document: any;


  constructor (
    private _formBuilder: FormBuilder,
    private _filesService: FilesService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}


  uploadFileForm = this._formBuilder.group({

  });


  newFileMetadataForm = this._formBuilder.group({
    aboutFile: ['', Validators.required],
    filename: ['', Validators.required]
  });

  uploadFile(): void{
    this._filesService.uploadFile(this.Document).subscribe((response: any) => {

      this.FileStorageID = response.fileStorageID;
      this.FileURL = response.fileURL;
    });
  }

  addFileMetaData(): void {
    this._filesService.newFileMetaData({
      createdBy: window.sessionStorage.getItem('email'),
      fileStorageID: this.FileStorageID,
      fileURL: this.FileURL,
      aboutFile: this.newFileMetadataForm.value.aboutFile,
      filename: this.newFileMetadataForm.value.filename,
      fileType: window.localStorage.getItem('FileExt')
    }).subscribe((response: any) => {
      this._matSnackBar.open(`${ response.id}`, 'Dismiss');

      setTimeout(async() => {
        this.formData.append('fileType', `${ window.localStorage.getItem('FileExt')}`);
        this.formData.append('fileID', response.id);


        this._filesService.genFileEmbeddings(this.formData).subscribe((res: any) => {
          this.Response = response;

          this._matSnackBar.open(`${ res.response }`, 'Dismiss');
          this._router.navigate(['/files'])
        });
      });
    });
  }



  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.size > 10240000) {
        this._matSnackBar.open('File too big. Must be less than 10MB', 'Dismiss');
        this.DisableFileUploadForm = true;

      } else {
        this.DisableFileUploadForm = false;
        this.getFileExtension(`${ file.name }`);
        this.formData.append('file', file);
        this.Document = new Blob([file],  { type: `${ file.type }`})
      }

    }
  }

  getFileExtension(file: any) {
    const ext = file.substring(file.lastIndexOf('.') + 1, file.length);

    window.localStorage.setItem('FileExt', ext);
    return ext;
  }



}

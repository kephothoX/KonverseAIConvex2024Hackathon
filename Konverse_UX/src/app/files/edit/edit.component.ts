import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FilesService } from '../files.service';
import { File } from '../file';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-upload',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  File!: File;
  formData = new FormData();
  FileStorageID?: string;
  FileURL?: string;
  Response: any;
  DisableFileUploadForm: boolean = true;
  FileID?: string;
  _ID?: string;
  Document: any;


  FileTypes: String[] = ['PDF', 'DOC', 'TXT', 'XLS', 'XLSX']

  constructor (
    private _formBuilder: FormBuilder,
    private _filesService: FilesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._filesService.getFile({ id: this._activatedRoute.snapshot.params['id']}).subscribe((response: any) => {

      this._ID = this._activatedRoute.snapshot.params['id'];
      this.FileID = response[0].fileID;
      this.FileURL = response[0].fileURL;
      this.File = response[0];
    })
  }


  uploadFileForm = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  updateFileMetadataForm = this._formBuilder.group({
    aboutFile: ['', Validators.required],
    filename: ['', Validators.required],
    fileType: ['', Validators.required]
  });

  uploadFile(): void{
    this._filesService.uploadFile(this.Document).subscribe((response: any) => {

      this.FileID = response.fileID;
      this.FileURL = response.fileURL;
    });
  }

  updateFileMetaData(): void {
    this._filesService.updateFileMetaData({
      id: this._ID,
      createdBy: window.sessionStorage.getItem('email'),
      fileID: this.FileID,
      fileURL: this.FileURL,
      aboutFile: this.updateFileMetadataForm.value.aboutFile,
      filename: this.updateFileMetadataForm.value.filename,
      fileType: this.updateFileMetadataForm.value.fileType
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


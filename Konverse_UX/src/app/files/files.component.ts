import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FilesService } from './files.service';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from './file';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit{
  Files?: File[];

  constructor (
    private _filesService: FilesService,
    private _matDialog: MatDialog,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._filesService.getFiles({ createdBy: `${ window.sessionStorage.getItem('email')}`}).subscribe((response: any) => {
      this.Files = response;
    });
  }


}


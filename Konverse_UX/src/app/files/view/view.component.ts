import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { FilesService } from '../files.service';
import { File } from '../file';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  File?: File;
  FileURL: any;


  constructor (
    private _filesService: FilesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void{
    const id = this._activatedRoute.snapshot.params['id'];
    this._filesService.getFile({ id: id }).subscribe((response: any) => {
      console.log(response);

      this.File = response[0];
    })
  }


  deleteFile(id: string, fileStorageId: string):  void {
    this._filesService.deleteFile({
      id: id,
      fileStorageID: fileStorageId
    }).subscribe((response: any) => {
      this._matSnackBar.open(`${ response.response }`, 'Dismiss');

      setTimeout(async () => {
        this._router.navigate(['/files']);
      }, 1000);
    });
  }

}

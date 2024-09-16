import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of} from 'rxjs';
import { ErrorService } from '../error/error.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private _appService: AppService,
    private _httpClient: HttpClient,
    private _errorService: ErrorService
  ) { }


  genFileEmbeddings(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.PythonAPIEndpoint }/embeddings/new`, data).pipe(catchError(this._errorService.handleError));
  }

  uploadFile(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/upload`, data, this._appService.httpOptionsMultipartForm).pipe(catchError(this._errorService.handleError));
  }

  newFileMetaData(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/metadata/new`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getFiles(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getFile(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/file`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getFileByFileID(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/file/id`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  updateFileMetaData(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/metadata/update`, data, this._appService.httpOptionsMultipartForm).pipe(catchError(this._errorService.handleError));
  }

  getFileByName(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/file/name`, data).pipe(catchError(this._errorService.handleError));
  }

  getFilesByType(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/type`, data).pipe(catchError(this._errorService.handleError));
  }

  deleteFile(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/file/delete`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  /*uploadFile(data: any): Observable<any> {
    return this._httpClient.post(`${this.ConvexAPIEndpoint}/embeddings/new`, data).pipe(catchError(this._errorService.handleError));
  };*/

}

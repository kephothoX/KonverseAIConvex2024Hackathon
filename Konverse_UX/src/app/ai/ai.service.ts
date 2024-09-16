import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of} from 'rxjs';
import { ErrorService } from '../error/error.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(
    private _appService: AppService,
    private _httpClient: HttpClient,
    private _errorService: ErrorService
  ) { }


  filesVectorSearch(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/vector/search`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  blogVectorSearch(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/blog/vector/search`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getFileEmbeddings(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/embeddings`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }


  docChat(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/ai/chat`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  blogChat(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/blog/ai/chat`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }


  generateContent(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.ConvexAPIEndpoint}/ai/content`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  };


  summarizeContent(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.ConvexAPIEndpoint}/ai/summarize`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  };

  stripHTML(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.ConvexAPIEndpoint}/content`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  };

}

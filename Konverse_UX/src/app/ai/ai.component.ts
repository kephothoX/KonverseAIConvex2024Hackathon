import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesService } from '../files/files.service';
import { BlogService } from '../blog/blog.service';
import { VectorScore } from './vector-score';
import { AiService } from './ai.service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AiComponent implements OnInit {
  PromptResponse: any;
  FilesScore?: VectorScore[];
  BlogScore?: VectorScore[];


  constructor (
    private _filesService: FilesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _blogService: BlogService,
    private _aiService: AiService
  ) {}


  ngOnInit(): void {
      /*const fileID = this._activatedRoute.snapshot.params['id'];

      console.log(fileID)
      window.localStorage.setItem('fileID', `${ fileID }`);

      this._filesService.getFile({ id: fileID }).subscribe((response: any) => {

      })*/
  }


  promptForm = this._formBuilder.group({
    query: ['', Validators.required]
  });

  ngOnSubmit(): void {

    this._aiService.filesVectorSearch({
      query: this.promptForm.value.query
    }).subscribe((response: any) => {
      this.FilesScore = response;
    });

    this._aiService.blogVectorSearch({
      query: this.promptForm.value.query
    }).subscribe((response: any) => {
      this.BlogScore = response;
    });
  }

  openFile(file: string) {
    this._aiService.getFileEmbeddings({
      id: file
    }).subscribe((response: any) => {
      this._filesService.getFileByFileID({
        id: response[0].fileID
      }).subscribe((res: any) => {
         this._router.navigate([`/files/view/${res[0]._id }`]);
      })
    })
  }


  openPost(post: string) {
    this._blogService.getPost({
      id: post
    }).subscribe((response: any) => {

      this._router.navigate([`/blog/view/${response[0]._id }`]);
    });
  }

}

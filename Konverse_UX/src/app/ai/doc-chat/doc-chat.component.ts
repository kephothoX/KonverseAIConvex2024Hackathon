import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'src/app/files/files.service';
import { AiService } from 'src/app/ai/ai.service';


@Component({
  selector: 'app-doc-chat',
  templateUrl: './doc-chat.component.html',
  styleUrl: './doc-chat.component.scss'
})
export class DocChatComponent implements OnInit {
  PromptResponse: any;
  HighlightsResponse: any;
  SummaryResponse: any;


  constructor (
    private _filesService: FilesService,
    private _activatedRoute: ActivatedRoute,
    private _aiService: AiService
  ) {}


  ngOnInit(): void {
      const fileID = this._activatedRoute.snapshot.params['id'];
      window.localStorage.setItem('fileID', `${ fileID }`);
  }

  ngOnSubmit(prompt: string): void {
    this._aiService.docChat({
      fileID: `${ window.localStorage.getItem('fileID')}`,
      prompt: prompt
    }).subscribe((response: any) => {

      this.PromptResponse = response;
    });
  }

  summarizeContent(): void {
    if (this.HighlightsResponse) {
      this._aiService.stripHTML({ content: this.PromptResponse }).subscribe((res: any) => {
        this._aiService.summarizeContent({
          content: res
        }).subscribe((response: any) => {
          this.SummaryResponse = response;
        });
      });
    }
  }


  highlights(): void {
    if(this.PromptResponse) {
      this._aiService.stripHTML({ content: this.PromptResponse }).subscribe((res: any) => {
        this._aiService.generateContent({
          prompt: `generate key highlights from ${ res } format result as html`
        }).subscribe((response: any) => {
          this.HighlightsResponse = response;
        });
      });
    }
  }


  furtherReading(content: string): void {

  }

  QAndA(content: string): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AiService } from 'src/app/ai/ai.service';

@Component({
  selector: 'app-blog-chat',
  templateUrl: './blog-chat.component.html',
  styleUrl: './blog-chat.component.scss'
})
export class BlogChatComponent implements OnInit {
  PromptResponse: any;
  HighlightsResponse: any;
  SummaryResponse: any;


  constructor (
    private _activatedRoute: ActivatedRoute,
    private _aiService: AiService
  ) {}


  ngOnInit(): void {
      const postID = this._activatedRoute.snapshot.params['id'];
      window.localStorage.setItem('postID', `${ postID }`);
  }

  ngOnSubmit(prompt: string): void {
    this._aiService.blogChat({
      postID: `${ window.localStorage.getItem('postID')}`,
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




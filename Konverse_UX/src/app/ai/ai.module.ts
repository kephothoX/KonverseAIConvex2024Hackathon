import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { provideHttpClient } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { AiRoutingModule } from './ai-routing.module';
import { AiComponent } from './ai.component';
import { DocChatComponent } from './doc-chat/doc-chat.component';
import { BlogChatComponent } from './blog-chat/blog-chat.component';

@NgModule({
  declarations: [
    AiComponent,
    DocChatComponent,
    BlogChatComponent
  ],
  imports: [
    CommonModule,
    AiRoutingModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBar,
    MatListModule,
    MatExpansionModule


  ],
  providers: [
     provideHttpClient(),
  ]

})
export class AiModule { }

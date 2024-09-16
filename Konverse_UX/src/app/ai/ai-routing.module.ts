import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiComponent } from './ai.component';
import { DocChatComponent } from './doc-chat/doc-chat.component';
import { BlogChatComponent } from './blog-chat/blog-chat.component';

const routes: Routes = [
  { path: '', component: AiComponent },
  { path: 'doc/chat/:id', title: 'Chat With Your Document', component: DocChatComponent },
  { path: 'blog/chat/:id', title: 'Chat With Post', component: BlogChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiRoutingModule { }

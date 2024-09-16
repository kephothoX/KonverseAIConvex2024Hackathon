import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogChatComponent } from './blog-chat.component';

describe('BlogChatComponent', () => {
  let component: BlogChatComponent;
  let fixture: ComponentFixture<BlogChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

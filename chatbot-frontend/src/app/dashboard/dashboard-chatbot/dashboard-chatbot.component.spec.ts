import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChatbotComponent } from './dashboard-chatbot.component';

describe('DashboardChatbotComponent', () => {
  let component: DashboardChatbotComponent;
  let fixture: ComponentFixture<DashboardChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChatbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAboutUsComponent } from './dashboard-about-us.component';

describe('DashboardAboutUsComponent', () => {
  let component: DashboardAboutUsComponent;
  let fixture: ComponentFixture<DashboardAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAboutUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

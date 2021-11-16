import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeleteSwComponent } from './app-delete-sw.component';

describe('AppDeleteSwComponent', () => {
  let component: AppDeleteSwComponent;
  let fixture: ComponentFixture<AppDeleteSwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDeleteSwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeleteSwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

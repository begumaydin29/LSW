import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePassiveConfirmComponent } from './active-passive-confirm.component';

describe('ActivePassiveConfirmComponent', () => {
  let component: ActivePassiveConfirmComponent;
  let fixture: ComponentFixture<ActivePassiveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePassiveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePassiveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddSwComponent } from './add-sw.component';

describe('AddSwComponent', () => {
  let component: AddSwComponent;
  let fixture: ComponentFixture<AddSwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

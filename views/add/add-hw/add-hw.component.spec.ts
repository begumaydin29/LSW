/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddHwComponent } from './add-hw.component';

describe('AddHwComponent', () => {
  let component: AddHwComponent;
  let fixture: ComponentFixture<AddHwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

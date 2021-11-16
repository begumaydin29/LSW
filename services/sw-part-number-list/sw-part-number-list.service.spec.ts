/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwPartNumberListService } from './sw-part-number-list.service';

describe('Service: SwPartNumberList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwPartNumberListService]
    });
  });

  it('should ...', inject([SwPartNumberListService], (service: SwPartNumberListService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComparisonService } from './comparison.service';

describe('Service: Comparison', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComparisonService]
    });
  });

  it('should ...', inject([ComparisonService], (service: ComparisonService) => {
    expect(service).toBeTruthy();
  }));
});

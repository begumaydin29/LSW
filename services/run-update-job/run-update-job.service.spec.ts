/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RunUpdateJobService } from './run-update-job.service';

describe('Service: RunUpdateJob', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunUpdateJobService]
    });
  });

  it('should ...', inject([RunUpdateJobService], (service: RunUpdateJobService) => {
    expect(service).toBeTruthy();
  }));
});

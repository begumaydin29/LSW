/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListSoftwareService } from './list-software.service';

describe('Service: ListSoftware', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListSoftwareService]
    });
  });

  it('should ...', inject([ListSoftwareService], (service: ListSoftwareService) => {
    expect(service).toBeTruthy();
  }));
});

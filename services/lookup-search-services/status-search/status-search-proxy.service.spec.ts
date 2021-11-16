/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatusSearchProxyService } from './status-search-proxy.service';

describe('Service: StatusSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusSearchProxyService]
    });
  });

  it('should ...', inject([StatusSearchProxyService], (service: StatusSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

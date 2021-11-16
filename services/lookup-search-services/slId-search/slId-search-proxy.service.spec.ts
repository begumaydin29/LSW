/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlIdSearchProxyService } from './slId-search-proxy.service';

describe('Service: SlIdSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlIdSearchProxyService]
    });
  });

  it('should ...', inject([SlIdSearchProxyService], (service: SlIdSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

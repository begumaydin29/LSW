/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HwPnSearchProxyService } from './hwPn-search-proxy.service';

describe('Service: HwPnSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HwPnSearchProxyService]
    });
  });

  it('should ...', inject([HwPnSearchProxyService], (service: HwPnSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HwPnProxyService } from './hwPn-proxy.service';

describe('Service: HwPnProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HwPnProxyService]
    });
  });

  it('should ...', inject([HwPnProxyService], (service: HwPnProxyService) => {
    expect(service).toBeTruthy();
  }));
});

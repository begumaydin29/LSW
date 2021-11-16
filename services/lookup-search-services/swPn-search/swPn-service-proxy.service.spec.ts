/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwPnServiceProxyService } from './swPn-service-proxy.service';

describe('Service: SwPnServiceProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwPnServiceProxyService]
    });
  });

  it('should ...', inject([SwPnServiceProxyService], (service: SwPnServiceProxyService) => {
    expect(service).toBeTruthy();
  }));
});

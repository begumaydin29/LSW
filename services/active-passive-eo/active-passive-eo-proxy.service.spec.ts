/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivePassiveEoProxyService } from './active-passive-eo-proxy.service';

describe('Service: ActivePassiveEoProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivePassiveEoProxyService]
    });
  });

  it('should ...', inject([ActivePassiveEoProxyService], (service: ActivePassiveEoProxyService) => {
    expect(service).toBeTruthy();
  }));
});

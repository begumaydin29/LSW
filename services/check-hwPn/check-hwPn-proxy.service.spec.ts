/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckHwPnProxyService } from './check-hwPn-proxy.service';

describe('Service: CheckHwPnProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckHwPnProxyService]
    });
  });

  it('should ...', inject([CheckHwPnProxyService], (service: CheckHwPnProxyService) => {
    expect(service).toBeTruthy();
  }));
});

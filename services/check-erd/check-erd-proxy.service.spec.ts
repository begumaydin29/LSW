/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckErdProxyService } from './check-erd-proxy.service';

describe('Service: CheckErdProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckErdProxyService]
    });
  });

  it('should ...', inject([CheckErdProxyService], (service: CheckErdProxyService) => {
    expect(service).toBeTruthy();
  }));
});

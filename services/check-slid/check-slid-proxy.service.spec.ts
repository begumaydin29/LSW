/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckSlidProxyService } from './check-slid-proxy.service';

describe('Service: CheckSlidProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckSlidProxyService]
    });
  });

  it('should ...', inject([CheckSlidProxyService], (service: CheckSlidProxyService) => {
    expect(service).toBeTruthy();
  }));
});

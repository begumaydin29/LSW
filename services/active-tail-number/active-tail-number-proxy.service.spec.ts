/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActiveTailNumberProxyService } from './active-tail-number-proxy.service';

describe('Service: ActiveTailNumberProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveTailNumberProxyService]
    });
  });

  it('should ...', inject([ActiveTailNumberProxyService], (service: ActiveTailNumberProxyService) => {
    expect(service).toBeTruthy();
  }));
});

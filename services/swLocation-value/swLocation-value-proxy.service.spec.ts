/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwLocationValueProxyService } from './swLocation-value-proxy.service';

describe('Service: SwLocationValueProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwLocationValueProxyService]
    });
  });

  it('should ...', inject([SwLocationValueProxyService], (service: SwLocationValueProxyService) => {
    expect(service).toBeTruthy();
  }));
});

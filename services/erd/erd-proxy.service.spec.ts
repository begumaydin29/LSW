/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErdProxyService } from './erd-proxy.service';

describe('Service: ErdProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErdProxyService]
    });
  });

  it('should ...', inject([ErdProxyService], (service: ErdProxyService) => {
    expect(service).toBeTruthy();
  }));
});

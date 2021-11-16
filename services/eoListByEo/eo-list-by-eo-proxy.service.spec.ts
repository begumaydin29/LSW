/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EoListByEoProxyService } from './eo-list-by-eo-proxy.service';

describe('Service: EoListByEoProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EoListByEoProxyService]
    });
  });

  it('should ...', inject([EoListByEoProxyService], (service: EoListByEoProxyService) => {
    expect(service).toBeTruthy();
  }));
});

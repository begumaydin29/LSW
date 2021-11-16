/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EoListProxyService } from './eo-list-proxy.service';

describe('Service: EoListProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EoListProxyService]
    });
  });

  it('should ...', inject([EoListProxyService], (service: EoListProxyService) => {
    expect(service).toBeTruthy();
  }));
});

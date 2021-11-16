/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EoInsertProxyService } from './eo-insert-proxy.service';

describe('Service: EoInsertProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EoInsertProxyService]
    });
  });

  it('should ...', inject([EoInsertProxyService], (service: EoInsertProxyService) => {
    expect(service).toBeTruthy();
  }));
});

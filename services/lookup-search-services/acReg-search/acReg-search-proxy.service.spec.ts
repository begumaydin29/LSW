/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcRegSearchProxyService } from './acReg-search-proxy.service';

describe('Service: AcRegSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcRegSearchProxyService]
    });
  });

  it('should ...', inject([AcRegSearchProxyService], (service: AcRegSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

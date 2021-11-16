/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EoNumberSearchProxyService } from './eoNumber-search-proxy.service';

describe('Service: EoNumberSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EoNumberSearchProxyService]
    });
  });

  it('should ...', inject([EoNumberSearchProxyService], (service: EoNumberSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

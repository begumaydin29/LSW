/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErdSearchProxyService } from './erd-search-proxy.service';

describe('Service: ErdSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErdSearchProxyService]
    });
  });

  it('should ...', inject([ErdSearchProxyService], (service: ErdSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeySearchProxyService } from './key-search-proxy.service';

describe('Service: KeySearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeySearchProxyService]
    });
  });

  it('should ...', inject([KeySearchProxyService], (service: KeySearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});

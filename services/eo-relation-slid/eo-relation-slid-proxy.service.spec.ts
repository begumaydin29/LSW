/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EoRelationSlidProxyService } from './eo-relation-slid-proxy.service';

describe('Service: EoRelationSlidProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EoRelationSlidProxyService]
    });
  });

  it('should ...', inject([EoRelationSlidProxyService], (service: EoRelationSlidProxyService) => {
    expect(service).toBeTruthy();
  }));
});

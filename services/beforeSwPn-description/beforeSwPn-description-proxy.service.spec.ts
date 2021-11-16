/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BeforeSwPnDescriptionProxyService } from './beforeSwPn-description-proxy.service';

describe('Service: BeforeSwPnDescriptionProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeforeSwPnDescriptionProxyService]
    });
  });

  it('should ...', inject([BeforeSwPnDescriptionProxyService], (service: BeforeSwPnDescriptionProxyService) => {
    expect(service).toBeTruthy();
  }));
});

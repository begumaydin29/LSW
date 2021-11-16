/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErdDescriptionProxyService } from './erd-description-proxy.service';

describe('Service: ErdDescriptionProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErdDescriptionProxyService]
    });
  });

  it('should ...', inject([ErdDescriptionProxyService], (service: ErdDescriptionProxyService) => {
    expect(service).toBeTruthy();
  }));
});

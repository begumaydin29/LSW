/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartNumberDescriptionProxyService } from './part-number-description-proxy.service';

describe('Service: PartNumberDescriptionProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartNumberDescriptionProxyService]
    });
  });

  it('should ...', inject([PartNumberDescriptionProxyService], (service: PartNumberDescriptionProxyService) => {
    expect(service).toBeTruthy();
  }));
});

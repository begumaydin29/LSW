/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwLocationDescriptionProxyService } from './swLocation-description-proxy.service';

describe('Service: SwLocationDescriptionProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwLocationDescriptionProxyService]
    });
  });

  it('should ...', inject([SwLocationDescriptionProxyService], (service: SwLocationDescriptionProxyService) => {
    expect(service).toBeTruthy();
  }));
});

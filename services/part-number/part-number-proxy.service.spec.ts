/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartNumberProxyService } from './part-number-proxy.service';

describe('Service: PartNumberProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartNumberProxyService]
    });
  });

  it('should ...', inject([PartNumberProxyService], (service: PartNumberProxyService) => {
    expect(service).toBeTruthy();
  }));
});

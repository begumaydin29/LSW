/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HwDescProxyService } from './hwDesc-proxy.service';

describe('Service: HwDescProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HwDescProxyService]
    });
  });

  it('should ...', inject([HwDescProxyService], (service: HwDescProxyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AirplaneByIdProxyService } from './airplane-byId-proxy.service';

describe('Service: AirplaneByIdProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirplaneByIdProxyService]
    });
  });

  it('should ...', inject([AirplaneByIdProxyService], (service: AirplaneByIdProxyService) => {
    expect(service).toBeTruthy();
  }));
});

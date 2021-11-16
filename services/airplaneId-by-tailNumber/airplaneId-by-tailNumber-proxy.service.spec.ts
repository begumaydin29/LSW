/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AirplaneIdByTailNumberProxyService } from './airplaneId-by-tailNumber-proxy.service';

describe('Service: AirplaneIdByTailNumberProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirplaneIdByTailNumberProxyService]
    });
  });

  it('should ...', inject([AirplaneIdByTailNumberProxyService], (service: AirplaneIdByTailNumberProxyService) => {
    expect(service).toBeTruthy();
  }));
});

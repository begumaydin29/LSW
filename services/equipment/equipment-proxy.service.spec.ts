/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EquipmentProxyService } from './equipment-proxy.service';

describe('Service: EquipmentProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentProxyService]
    });
  });

  it('should ...', inject([EquipmentProxyService], (service: EquipmentProxyService) => {
    expect(service).toBeTruthy();
  }));
});

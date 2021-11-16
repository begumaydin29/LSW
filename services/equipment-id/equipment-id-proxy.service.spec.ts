/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EquipmentIdProxyService } from './equipment-id-proxy.service';

describe('Service: EquipmentIdProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentIdProxyService]
    });
  });

  it('should ...', inject([EquipmentIdProxyService], (service: EquipmentIdProxyService) => {
    expect(service).toBeTruthy();
  }));
});

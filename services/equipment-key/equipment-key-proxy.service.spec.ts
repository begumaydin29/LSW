import { TestBed } from '@angular/core/testing';

import { EquipmentKeyProxyService } from './equipment-key-proxy.service';

describe('EquipmentKeyProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipmentKeyProxyService = TestBed.get(EquipmentKeyProxyService);
    expect(service).toBeTruthy();
  });
});

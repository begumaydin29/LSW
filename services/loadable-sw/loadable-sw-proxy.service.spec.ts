import { TestBed } from '@angular/core/testing';

import { LoadableSwProxyService } from './loadable-sw-proxy.service';

describe('LoadableSwProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadableSwProxyService = TestBed.get(LoadableSwProxyService);
    expect(service).toBeTruthy();
  });
});

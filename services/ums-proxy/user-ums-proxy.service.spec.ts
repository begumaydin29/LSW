/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserUmsProxyService } from './user-ums-proxy.service';

describe('Service: UserUmsProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserUmsProxyService]
    });
  });

  it('should ...', inject([UserUmsProxyService], (service: UserUmsProxyService) => {
    expect(service).toBeTruthy();
  }));
});
